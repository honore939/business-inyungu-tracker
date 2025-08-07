const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Middleware yo kugenzura authentication
const genzuraAuthentication = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        ikosa: true,
        ubutumwa: 'Ntago winjiye muri sisitemu. Injira mbere.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ubucuruzi_secret_key');
    
    // Gusuzuma niba umukoresha aracyari muri database
    const [rows] = await pool.execute(
      'SELECT id, amazina, email, urwego, ubucuruzi_id FROM abakoresha WHERE id = ? AND byemejwe = TRUE',
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        ikosa: true,
        ubutumwa: 'Konti yawe ntiyemejwe cyangwa ntibaho. Vugurura konti yawe.'
      });
    }

    req.umukoresha = rows[0];
    next();
  } catch (error) {
    console.error('Ikosa muri authentication:', error);
    return res.status(401).json({
      ikosa: true,
      ubutumwa: 'Token ntiyemewe. Injira muri sisitemu.'
    });
  }
};

// Middleware yo kugenzura urwego rw'umukoresha
const genzuraUrwego = (amurwego) => {
  return (req, res, next) => {
    if (!amurwego.includes(req.umukoresha.urwego)) {
      return res.status(403).json({
        ikosa: true,
        ubutumwa: 'Ntufite uburenganzira bwo gukora iki gikorwa.'
      });
    }
    next();
  };
};

module.exports = { genzuraAuthentication, genzuraUrwego };