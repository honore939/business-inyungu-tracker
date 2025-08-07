const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');
const { genzuraAuthentication } = require('../middleware/auth');
const router = express.Router();

// Igenamiterere rya multer kuri amafoto
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/amafoto/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ifoto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Gusa amafoto ya JPEG, JPG, PNG cyangwa GIF yemewe!'));
    }
  }
});

// Guhanga konti nshya
router.post('/guhanga-konti', upload.single('ifoto'), async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const {
      amazina,
      email,
      telefoni,
      ijambobanga,
      urwego,
      ubucuruzi
    } = req.body;

    // Kugenzura niba email isanzwe ihari
    const [existingUser] = await connection.execute(
      'SELECT id FROM abakoresha WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        ikosa: true,
        ubutumwa: 'Email isanzwe yarakoreshejwe. Hitamo email ikindi.'
      });
    }

    // Guhisha ijambobanga
    const hashedPassword = await bcrypt.hash(ijambobanga, 12);
    
    let ubucuruzi_id = null;

    // Niba ari umuyobozi, gukora ubucuruzi bushya
    if (urwego === 'umuyobozi' && ubucuruzi) {
      const ubucuruziData = JSON.parse(ubucuruzi);
      
      const [businessResult] = await connection.execute(
        'INSERT INTO ubucuruzi (izina, ubwoko, ifaranga, aderesi, numero_yumusanzu) VALUES (?, ?, ?, ?, ?)',
        [
          ubucuruziData.izina,
          ubucuruziData.ubwoko,
          ubucuruziData.ifaranga || 'RWF',
          ubucuruziData.aderesi,
          ubucuruziData.numeroYumusanzu || null
        ]
      );
      
      ubucuruzi_id = businessResult.insertId;
    }

    // Gukora umukoresha mushya
    const ifotoPath = req.file ? req.file.path : null;
    
    const [userResult] = await connection.execute(
      'INSERT INTO abakoresha (amazina, email, telefoni, ijambobanga, urwego, ifoto, ubucuruzi_id, byemejwe) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [amazina, email, telefoni, hashedPassword, urwego, ifotoPath, ubucuruzi_id, true]
    );

    await connection.commit();

    // Gukora JWT token
    const token = jwt.sign(
      { 
        id: userResult.insertId,
        email: email,
        urwego: urwego
      },
      process.env.JWT_SECRET || 'ubucuruzi_secret_key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      ikosa: false,
      ubutumwa: 'Konti yawe yaremwe neza!',
      umukoresha: {
        id: userResult.insertId,
        amazina,
        email,
        telefoni,
        urwego,
        ifoto: ifotoPath,
        ubucuruzi_id
      },
      token
    });

  } catch (error) {
    await connection.rollback();
    console.error('Ikosa mu guhanga konti:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu guhanga konti. Ongera ugerageze.'
    });
  } finally {
    connection.release();
  }
});

// Kwinjira muri sisitemu
router.post('/kwinjira', async (req, res) => {
  try {
    const { email, ijambobanga } = req.body;

    // Gushaka umukoresha
    const [rows] = await pool.execute(
      'SELECT * FROM abakoresha WHERE email = ? AND byemejwe = TRUE',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        ikosa: true,
        ubutumwa: 'Email cyangwa ijambobanga sibyo.'
      });
    }

    const umukoresha = rows[0];

    // Kugenzura ijambobanga
    const isPasswordValid = await bcrypt.compare(ijambobanga, umukoresha.ijambobanga);

    if (!isPasswordValid) {
      return res.status(401).json({
        ikosa: true,
        ubutumwa: 'Email cyangwa ijambobanga sibyo.'
      });
    }

    // Gukora JWT token
    const token = jwt.sign(
      { 
        id: umukoresha.id,
        email: umukoresha.email,
        urwego: umukoresha.urwego
      },
      process.env.JWT_SECRET || 'ubucuruzi_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      ikosa: false,
      ubutumwa: 'Murakaza neza!',
      umukoresha: {
        id: umukoresha.id,
        amazina: umukoresha.amazina,
        email: umukoresha.email,
        telefoni: umukoresha.telefoni,
        urwego: umukoresha.urwego,
        ifoto: umukoresha.ifoto,
        ubucuruzi_id: umukoresha.ubucuruzi_id
      },
      token
    });

  } catch (error) {
    console.error('Ikosa mu kwinjira:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu kwinjira. Ongera ugerageze.'
    });
  }
});

// Kubona amakuru y'umukoresha
router.get('/amakuru-yanjye', genzuraAuthentication, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT a.*, u.izina as izina_ubucuruzi, u.ubwoko, u.ifaranga, u.aderesi, u.numero_yumusanzu
       FROM abakoresha a
       LEFT JOIN ubucuruzi u ON a.ubucuruzi_id = u.id
       WHERE a.id = ?`,
      [req.umukoresha.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ikosa: true,
        ubutumwa: 'Amakuru y\'umukoresha ntabwo yabonetse.'
      });
    }

    const umukoresha = rows[0];
    delete umukoresha.ijambobanga; // Gukuraho ijambobanga

    res.json({
      ikosa: false,
      umukoresha
    });

  } catch (error) {
    console.error('Ikosa mu kubona amakuru:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu kubona amakuru.'
    });
  }
});

module.exports = router;