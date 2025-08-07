const express = require('express');
const multer = require('multer');
const path = require('path');
const { pool } = require('../config/database');
const { genzuraAuthentication, genzuraUrwego } = require('../middleware/auth');
const router = express.Router();

// Igenamiterere rya multer kuri amafoto y'ibicuruzwa
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/ibicuruzwa/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'icyicuruzwa-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
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

// Kubona ibicuruzwa byose
router.get('/', genzuraAuthentication, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM ibicuruzwa WHERE ubucuruzi_id = ? ORDER BY byaremwe DESC',
      [req.umukoresha.ubucuruzi_id]
    );

    res.json({
      ikosa: false,
      ibicuruzwa: rows
    });

  } catch (error) {
    console.error('Ikosa mu kubona ibicuruzwa:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu kubona ibicuruzwa.'
    });
  }
});

// Kongeraho icyicuruzwa gishya
router.post('/', genzuraAuthentication, genzuraUrwego(['umuyobozi', 'umukozi']), upload.single('ifoto'), async (req, res) => {
  try {
    const {
      izina,
      icyiciro,
      kode,
      igiciro_kugura,
      igiciro_kugurisha,
      umubare,
      ibisobanuro,
      uwatanga
    } = req.body;

    // Kugenzura niba kode isanzwe ihari
    const [existingProduct] = await pool.execute(
      'SELECT id FROM ibicuruzwa WHERE kode = ? AND ubucuruzi_id = ?',
      [kode, req.umukoresha.ubucuruzi_id]
    );

    if (existingProduct.length > 0) {
      return res.status(400).json({
        ikosa: true,
        ubutumwa: 'Kode y\'icyicuruzwa isanzwe yarakoreshejwe. Hitamo kode ikindi.'
      });
    }

    const ifotoPath = req.file ? req.file.path : null;

    const [result] = await pool.execute(
      `INSERT INTO ibicuruzwa 
       (izina, icyiciro, kode, igiciro_kugura, igiciro_kugurisha, umubare, ibisobanuro, uwatanga, ifoto, ubucuruzi_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [izina, icyiciro, kode, parseFloat(igiciro_kugura), parseFloat(igiciro_kugurisha), 
       parseInt(umubare), ibisobanuro, uwatanga, ifotoPath, req.umukoresha.ubucuruzi_id]
    );

    // Kohereza notification ku bayobozi
    await pool.execute(
      `INSERT INTO amakuru (umutwe, ubutumwa, ubwoko, ubucuruzi_id) 
       VALUES (?, ?, ?, ?)`,
      [
        'Icyicuruzwa gishya cyongewe',
        `Icyicuruzwa "${izina}" cyongewe muri sisitemu na ${req.umukoresha.amazina}`,
        'intsinzi',
        req.umukoresha.ubucuruzi_id
      ]
    );

    res.status(201).json({
      ikosa: false,
      ubutumwa: 'Icyicuruzwa cyongewe neza!',
      icyicuruzwa: {
        id: result.insertId,
        izina,
        icyiciro,
        kode,
        igiciro_kugura: parseFloat(igiciro_kugura),
        igiciro_kugurisha: parseFloat(igiciro_kugurisha),
        umubare: parseInt(umubare),
        ibisobanuro,
        uwatanga,
        ifoto: ifotoPath
      }
    });

  } catch (error) {
    console.error('Ikosa mu kongeraho icyicuruzwa:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu kongeraho icyicuruzwa.'
    });
  }
});

// Kuvugurura icyicuruzwa
router.put('/:id', genzuraAuthentication, genzuraUrwego(['umuyobozi', 'umukozi']), upload.single('ifoto'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      izina,
      icyiciro,
      kode,
      igiciro_kugura,
      igiciro_kugurisha,
      umubare,
      ibisobanuro,
      uwatanga
    } = req.body;

    // Kugenzura niba icyicuruzwa kibaho
    const [existing] = await pool.execute(
      'SELECT * FROM ibicuruzwa WHERE id = ? AND ubucuruzi_id = ?',
      [id, req.umukoresha.ubucuruzi_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        ikosa: true,
        ubutumwa: 'Icyicuruzwa ntikiboneka.'
      });
    }

    const ifotoPath = req.file ? req.file.path : existing[0].ifoto;

    await pool.execute(
      `UPDATE ibicuruzwa 
       SET izina = ?, icyiciro = ?, kode = ?, igiciro_kugura = ?, igiciro_kugurisha = ?, 
           umubare = ?, ibisobanuro = ?, uwatanga = ?, ifoto = ?
       WHERE id = ? AND ubucuruzi_id = ?`,
      [izina, icyiciro, kode, parseFloat(igiciro_kugura), parseFloat(igiciro_kugurisha),
       parseInt(umubare), ibisobanuro, uwatanga, ifotoPath, id, req.umukoresha.ubucuruzi_id]
    );

    res.json({
      ikosa: false,
      ubutumwa: 'Icyicuruzwa cyavuguruwe neza!'
    });

  } catch (error) {
    console.error('Ikosa mu kuvugurura icyicuruzwa:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu kuvugurura icyicuruzwa.'
    });
  }
});

// Gusiba icyicuruzwa
router.delete('/:id', genzuraAuthentication, genzuraUrwego(['umuyobozi']), async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM ibicuruzwa WHERE id = ? AND ubucuruzi_id = ?',
      [id, req.umukoresha.ubucuruzi_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ikosa: true,
        ubutumwa: 'Icyicuruzwa ntikiboneka.'
      });
    }

    res.json({
      ikosa: false,
      ubutumwa: 'Icyicuruzwa cyasibwe neza!'
    });

  } catch (error) {
    console.error('Ikosa mu gusiba icyicuruzwa:', error);
    res.status(500).json({
      ikosa: true,
      ubutumwa: 'Ikosa ryabaye mu gusiba icyicuruzwa.'
    });
  }
});

module.exports = router;