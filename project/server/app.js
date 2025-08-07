const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Gutangiza Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Gukora amadosiye y'uploads
const uploadDirs = ['uploads/amafoto', 'uploads/ibicuruzwa'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middleware za security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    ikosa: true,
    ubutumwa: 'Wakoze ibisabwa byinshi. Tegereza gato hanyuma ugerageze.'
  }
});
app.use('/api', limiter);

// USSD rate limiting (more permissive)
const ussdLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute for USSD
  message: 'END Wakoze ibisabwa byinshi. Tegereza gato hanyuma ugerageze.'
});
app.use('/ussd', ussdLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database setup
const { createTables } = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const ussdRoutes = require('./routes/ussd');

app.use('/api/auth', authRoutes);
app.use('/api/ibicuruzwa', productRoutes);
app.use('/ussd', ussdRoutes);

// Health check endpoint
app.get('/api/ubuzima', (req, res) => {
  res.json({
    ikosa: false,
    ubutumwa: 'Seriveri irakora neza!',
    igihe: new Date().toISOString(),
    services: {
      database: 'MySQL',
      ussd: 'Active',
      firebase: 'Connected'
    }
  });
});

// USSD webhook endpoint (for telecom providers)
app.post('/webhook/ussd', (req, res) => {
  // Forward to USSD handler
  req.url = '/ussd';
  ussdRoutes(req, res);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Ikosa rya seriveri:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        ikosa: true,
        ubutumwa: 'Ifoto ni nini cyane. Hitamo ifoto ntoya kuruta 5MB.'
      });
    }
  }
  
  res.status(500).json({
    ikosa: true,
    ubutumwa: 'Ikosa ryabaye muri seriveri. Ongera ugerageze.'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    ikosa: true,
    ubutumwa: 'Iyo nzira ntiboneka.'
  });
});

// Gutangiza seriveri
const startServer = async () => {
  try {
    await createTables();
    
    app.listen(PORT, () => {
      console.log(`🚀 Seriveri iratangira kuri port ${PORT}`);
      console.log(`📱 API: http://localhost:${PORT}/api`);
      console.log(`📞 USSD: http://localhost:${PORT}/ussd`);
      console.log(`💾 Database: MySQL`);
      console.log(`🔐 Security: JWT + bcrypt`);
      console.log(`📲 Mobile: Android + iOS ready`);
    });
  } catch (error) {
    console.error('❌ Ikosa mu gutangiza seriveri:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;