const mysql = require('mysql2/promise');

// Igenamiterere rya database
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ubucuruzi_db',
  charset: 'utf8mb4',
  timezone: '+03:00'
};

// Guhanga connection pool
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Gukora imbonerahamwe z'amakuru
const createTables = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Imbonerahamwe y'ubucuruzi
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ubucuruzi (
        id INT PRIMARY KEY AUTO_INCREMENT,
        izina VARCHAR(255) NOT NULL,
        ubwoko VARCHAR(100) NOT NULL,
        ifaranga VARCHAR(10) DEFAULT 'RWF',
        aderesi TEXT,
        numero_yumusanzu VARCHAR(50),
        telefoni VARCHAR(20),
        ussd_kode VARCHAR(10) UNIQUE,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        byavuguruwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'abakoresha
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS abakoresha (
        id INT PRIMARY KEY AUTO_INCREMENT,
        amazina VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        telefoni VARCHAR(20) NOT NULL UNIQUE,
        ijambobanga VARCHAR(255) NOT NULL,
        urwego ENUM('umuyobozi', 'umukozi', 'umukoresha') NOT NULL,
        ifoto VARCHAR(500),
        ubucuruzi_id INT,
        ussd_pin VARCHAR(6),
        byemejwe BOOLEAN DEFAULT FALSE,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        byavuguruwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE SET NULL,
        INDEX idx_telefoni (telefoni),
        INDEX idx_ussd_pin (ussd_pin)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'ibicuruzwa
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ibicuruzwa (
        id INT PRIMARY KEY AUTO_INCREMENT,
        izina VARCHAR(255) NOT NULL,
        icyiciro VARCHAR(100) NOT NULL,
        kode VARCHAR(50) NOT NULL,
        igiciro_kugura DECIMAL(15,2) NOT NULL,
        igiciro_kugurisha DECIMAL(15,2) NOT NULL,
        umubare INT NOT NULL DEFAULT 0,
        ibisobanuro TEXT,
        uwatanga VARCHAR(255),
        ifoto VARCHAR(500),
        ubucuruzi_id INT NOT NULL,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        byavuguruwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE CASCADE,
        UNIQUE KEY unique_kode_ubucuruzi (kode, ubucuruzi_id),
        INDEX idx_kode (kode),
        INDEX idx_icyiciro (icyiciro)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'ibikorwa
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ibikorwa (
        id INT PRIMARY KEY AUTO_INCREMENT,
        ubwoko ENUM('igurisha', 'kugura') NOT NULL,
        icyicuruzwa_id INT NOT NULL,
        umubare INT NOT NULL,
        igiciro_kimwe DECIMAL(15,2) NOT NULL,
        igiciro_cyose DECIMAL(15,2) NOT NULL,
        izina_umukiriya VARCHAR(255),
        izina_uwatanga VARCHAR(255),
        itariki DATE NOT NULL,
        inyandiko TEXT,
        uburyo_kwishyura ENUM('amafaranga', 'banki', 'mobile_money', 'ussd') DEFAULT 'amafaranga',
        umukoresha_id INT NOT NULL,
        ubucuruzi_id INT NOT NULL,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (icyicuruzwa_id) REFERENCES ibicuruzwa(id) ON DELETE CASCADE,
        FOREIGN KEY (umukoresha_id) REFERENCES abakoresha(id) ON DELETE CASCADE,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE CASCADE,
        INDEX idx_itariki (itariki),
        INDEX idx_ubwoko (ubwoko)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'amafaranga yasohotse
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS amafaranga_yasohotse (
        id INT PRIMARY KEY AUTO_INCREMENT,
        icyiciro VARCHAR(100) NOT NULL,
        ibisobanuro TEXT NOT NULL,
        amafaranga DECIMAL(15,2) NOT NULL,
        itariki DATE NOT NULL,
        uburyo_kwishyura VARCHAR(50) NOT NULL,
        umukoresha_id INT NOT NULL,
        ubucuruzi_id INT NOT NULL,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (umukoresha_id) REFERENCES abakoresha(id) ON DELETE CASCADE,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE CASCADE,
        INDEX idx_itariki (itariki),
        INDEX idx_icyiciro (icyiciro)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'amakuru
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS amakuru (
        id INT PRIMARY KEY AUTO_INCREMENT,
        umutwe VARCHAR(255) NOT NULL,
        ubutumwa TEXT NOT NULL,
        ubwoko ENUM('amakuru', 'intsinzi', 'iburira', 'ikosa') DEFAULT 'amakuru',
        akamaro ENUM('gito', 'gisanzwe', 'gikomeye') DEFAULT 'gisanzwe',
        byasomwe BOOLEAN DEFAULT FALSE,
        umukoresha_id INT,
        ubucuruzi_id INT NOT NULL,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (umukoresha_id) REFERENCES abakoresha(id) ON DELETE SET NULL,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE CASCADE,
        INDEX idx_byasomwe (byasomwe),
        INDEX idx_akamaro (akamaro)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe y'abakiriya
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS abakiriya (
        id INT PRIMARY KEY AUTO_INCREMENT,
        amazina VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telefoni VARCHAR(20),
        aderesi TEXT,
        ubucuruzi_id INT NOT NULL,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        byavuguruwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (ubucuruzi_id) REFERENCES ubucuruzi(id) ON DELETE CASCADE,
        INDEX idx_telefoni (telefoni)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Imbonerahamwe ya USSD sessions
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ussd_sessions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        session_id VARCHAR(255) UNIQUE NOT NULL,
        telefoni VARCHAR(20) NOT NULL,
        icyiciro VARCHAR(50) NOT NULL,
        amakuru JSON,
        byaremwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        byavuguruwe TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_session_id (session_id),
        INDEX idx_telefoni (telefoni)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    connection.release();
    console.log('✅ Imbonerahamwe z\'amakuru zarakoze neza');
  } catch (error) {
    console.error('❌ Ikosa mu gukora imbonerahamwe:', error);
  }
};

module.exports = { pool, createTables };