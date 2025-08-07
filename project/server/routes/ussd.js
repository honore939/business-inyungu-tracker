const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// USSD Menu Structure
const USSD_MENUS = {
  MAIN: {
    text: "Murakaza neza kuri Ubucuruzi TradeFlow\n1. Guhanga konti\n2. Kwinjira\n3. Kubona ibicuruzwa\n4. Gukora igikorwa\n5. Kubona amafaranga\n0. Gusohoka",
    options: ['1', '2', '3', '4', '5', '0']
  },
  REGISTER: {
    text: "Guhanga konti nshya:\n1. Injiza amazina yawe\n2. Injiza email yawe\n3. Injiza PIN yawe (6 imibare)\n0. Gusubira inyuma",
    options: ['1', '2', '3', '0']
  },
  LOGIN: {
    text: "Kwinjira muri sisitemu:\nInjiza PIN yawe ya 6 imibare:",
    options: []
  },
  PRODUCTS: {
    text: "Ibicuruzwa:\n1. Kureba ibicuruzwa byose\n2. Gushaka icyicuruzwa\n3. Kongeraho icyicuruzwa\n0. Gusubira inyuma",
    options: ['1', '2', '3', '0']
  },
  TRANSACTIONS: {
    text: "Ibikorwa:\n1. Kugurisha\n2. Kugura\n3. Kureba ibikorwa\n0. Gusubira inyuma",
    options: ['1', '2', '3', '0']
  },
  BALANCE: {
    text: "Amafaranga:\n1. Amafaranga yinjiye\n2. Amafaranga yasohotse\n3. Inyungu\n0. Gusubira inyuma",
    options: ['1', '2', '3', '0']
  }
};

// USSD Main Handler
router.post('/', async (req, res) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    
    let response = '';
    let endSession = false;

    // Kubona cyangwa gukora session
    let session = await getOrCreateSession(sessionId, phoneNumber);
    
    if (text === '') {
      // Gutangira session
      response = USSD_MENUS.MAIN.text;
      await updateSession(sessionId, 'MAIN', {});
    } else {
      const textArray = text.split('*');
      const lastInput = textArray[textArray.length - 1];
      
      switch (session.icyiciro) {
        case 'MAIN':
          response = await handleMainMenu(lastInput, sessionId, phoneNumber);
          break;
        case 'REGISTER':
          response = await handleRegister(lastInput, sessionId, phoneNumber, session.amakuru);
          break;
        case 'LOGIN':
          response = await handleLogin(lastInput, sessionId, phoneNumber);
          break;
        case 'PRODUCTS':
          response = await handleProducts(lastInput, sessionId, phoneNumber);
          break;
        case 'TRANSACTIONS':
          response = await handleTransactions(lastInput, sessionId, phoneNumber);
          break;
        case 'BALANCE':
          response = await handleBalance(lastInput, sessionId, phoneNumber);
          break;
        default:
          response = USSD_MENUS.MAIN.text;
          await updateSession(sessionId, 'MAIN', {});
      }
    }

    // Gusohoka
    if (response.includes('Murakoze') || response.includes('Ikosa')) {
      endSession = true;
      await deleteSession(sessionId);
    }

    res.set('Content-Type', 'text/plain');
    res.send(endSession ? `END ${response}` : `CON ${response}`);

  } catch (error) {
    console.error('USSD Error:', error);
    res.set('Content-Type', 'text/plain');
    res.send('END Ikosa ryabaye. Ongera ugerageze.');
  }
});

// Handle Main Menu
async function handleMainMenu(input, sessionId, phoneNumber) {
  switch (input) {
    case '1':
      await updateSession(sessionId, 'REGISTER', { step: 'name' });
      return USSD_MENUS.REGISTER.text;
    case '2':
      await updateSession(sessionId, 'LOGIN', {});
      return USSD_MENUS.LOGIN.text;
    case '3':
      await updateSession(sessionId, 'PRODUCTS', {});
      return USSD_MENUS.PRODUCTS.text;
    case '4':
      await updateSession(sessionId, 'TRANSACTIONS', {});
      return USSD_MENUS.TRANSACTIONS.text;
    case '5':
      await updateSession(sessionId, 'BALANCE', {});
      return USSD_MENUS.BALANCE.text;
    case '0':
      return 'Murakoze gukoresha Ubucuruzi TradeFlow!';
    default:
      return 'Hitamo umubare mwiza.\n' + USSD_MENUS.MAIN.text;
  }
}

// Handle Registration
async function handleRegister(input, sessionId, phoneNumber, sessionData) {
  const step = sessionData.step || 'name';
  
  switch (step) {
    case 'name':
      if (input === '0') return USSD_MENUS.MAIN.text;
      await updateSession(sessionId, 'REGISTER', { ...sessionData, amazina: input, step: 'email' });
      return 'Injiza email yawe:';
    
    case 'email':
      if (input === '0') return USSD_MENUS.MAIN.text;
      if (!isValidEmail(input)) {
        return 'Email ntiyemewe. Injiza email nyayo:';
      }
      await updateSession(sessionId, 'REGISTER', { ...sessionData, email: input, step: 'pin' });
      return 'Injiza PIN yawe ya 6 imibare:';
    
    case 'pin':
      if (input === '0') return USSD_MENUS.MAIN.text;
      if (input.length !== 6 || !/^\d+$/.test(input)) {
        return 'PIN igomba kuba ifite imibare 6. Ongera ugerageze:';
      }
      
      // Guhanga konti
      try {
        await createUser(sessionData.amazina, sessionData.email, phoneNumber, input);
        return 'Konti yawe yaremwe neza! Murakoze gukoresha Ubucuruzi TradeFlow.';
      } catch (error) {
        return 'Ikosa ryabaye mu guhanga konti. Ongera ugerageze.';
      }
    
    default:
      return USSD_MENUS.REGISTER.text;
  }
}

// Handle Login
async function handleLogin(input, sessionId, phoneNumber) {
  if (input.length !== 6 || !/^\d+$/.test(input)) {
    return 'PIN igomba kuba ifite imibare 6. Ongera ugerageze:';
  }
  
  try {
    const user = await authenticateUser(phoneNumber, input);
    if (user) {
      await updateSession(sessionId, 'MAIN', { userId: user.id });
      return `Murakaza neza ${user.amazina}!\n` + USSD_MENUS.MAIN.text;
    } else {
      return 'PIN cyangwa telefoni sibyo. Ongera ugerageze:';
    }
  } catch (error) {
    return 'Ikosa ryabaye mu kwinjira. Ongera ugerageze.';
  }
}

// Handle Products
async function handleProducts(input, sessionId, phoneNumber) {
  switch (input) {
    case '1':
      try {
        const products = await getProducts(phoneNumber);
        if (products.length === 0) {
          return 'Nta bicuruzwa biboneka.\n0. Gusubira inyuma';
        }
        let response = 'Ibicuruzwa:\n';
        products.slice(0, 5).forEach((product, index) => {
          response += `${index + 1}. ${product.izina} - ${product.igiciro_kugurisha} RWF\n`;
        });
        response += '0. Gusubira inyuma';
        return response;
      } catch (error) {
        return 'Ikosa ryabaye. Ongera ugerageze.\n0. Gusubira inyuma';
      }
    case '0':
      await updateSession(sessionId, 'MAIN', {});
      return USSD_MENUS.MAIN.text;
    default:
      return 'Hitamo umubare mwiza.\n' + USSD_MENUS.PRODUCTS.text;
  }
}

// Handle Transactions
async function handleTransactions(input, sessionId, phoneNumber) {
  switch (input) {
    case '1':
      return 'Kugurisha:\nInjiza kode y\'icyicuruzwa:';
    case '2':
      return 'Kugura:\nInjiza kode y\'icyicuruzwa:';
    case '3':
      try {
        const transactions = await getRecentTransactions(phoneNumber);
        if (transactions.length === 0) {
          return 'Nta bikorwa biboneka.\n0. Gusubira inyuma';
        }
        let response = 'Ibikorwa bya vuba:\n';
        transactions.slice(0, 3).forEach((transaction, index) => {
          response += `${index + 1}. ${transaction.ubwoko} - ${transaction.igiciro_cyose} RWF\n`;
        });
        response += '0. Gusubira inyuma';
        return response;
      } catch (error) {
        return 'Ikosa ryabaye. Ongera ugerageze.\n0. Gusubira inyuma';
      }
    case '0':
      await updateSession(sessionId, 'MAIN', {});
      return USSD_MENUS.MAIN.text;
    default:
      return 'Hitamo umubare mwiza.\n' + USSD_MENUS.TRANSACTIONS.text;
  }
}

// Handle Balance
async function handleBalance(input, sessionId, phoneNumber) {
  switch (input) {
    case '1':
      try {
        const revenue = await getTotalRevenue(phoneNumber);
        return `Amafaranga yinjiye: ${revenue} RWF\n0. Gusubira inyuma`;
      } catch (error) {
        return 'Ikosa ryabaye. Ongera ugerageze.\n0. Gusubira inyuma';
      }
    case '2':
      try {
        const expenses = await getTotalExpenses(phoneNumber);
        return `Amafaranga yasohotse: ${expenses} RWF\n0. Gusubira inyuma`;
      } catch (error) {
        return 'Ikosa ryabaye. Ongera ugerageze.\n0. Gusubira inyuma';
      }
    case '3':
      try {
        const revenue = await getTotalRevenue(phoneNumber);
        const expenses = await getTotalExpenses(phoneNumber);
        const profit = revenue - expenses;
        return `Inyungu: ${profit} RWF\n0. Gusubira inyuma`;
      } catch (error) {
        return 'Ikosa ryabaye. Ongera ugerageze.\n0. Gusubira inyuma';
      }
    case '0':
      await updateSession(sessionId, 'MAIN', {});
      return USSD_MENUS.MAIN.text;
    default:
      return 'Hitamo umubare mwiza.\n' + USSD_MENUS.BALANCE.text;
  }
}

// Database Helper Functions
async function getOrCreateSession(sessionId, phoneNumber) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM ussd_sessions WHERE session_id = ?',
      [sessionId]
    );
    
    if (rows.length > 0) {
      return {
        ...rows[0],
        amakuru: JSON.parse(rows[0].amakuru || '{}')
      };
    } else {
      await pool.execute(
        'INSERT INTO ussd_sessions (session_id, telefoni, icyiciro, amakuru) VALUES (?, ?, ?, ?)',
        [sessionId, phoneNumber, 'MAIN', '{}']
      );
      return { session_id: sessionId, telefoni: phoneNumber, icyiciro: 'MAIN', amakuru: {} };
    }
  } catch (error) {
    console.error('Session error:', error);
    return { session_id: sessionId, telefoni: phoneNumber, icyiciro: 'MAIN', amakuru: {} };
  }
}

async function updateSession(sessionId, icyiciro, amakuru) {
  try {
    await pool.execute(
      'UPDATE ussd_sessions SET icyiciro = ?, amakuru = ? WHERE session_id = ?',
      [icyiciro, JSON.stringify(amakuru), sessionId]
    );
  } catch (error) {
    console.error('Update session error:', error);
  }
}

async function deleteSession(sessionId) {
  try {
    await pool.execute('DELETE FROM ussd_sessions WHERE session_id = ?', [sessionId]);
  } catch (error) {
    console.error('Delete session error:', error);
  }
}

async function createUser(amazina, email, telefoni, pin) {
  const bcrypt = require('bcryptjs');
  const hashedPin = await bcrypt.hash(pin, 12);
  
  await pool.execute(
    'INSERT INTO abakoresha (amazina, email, telefoni, ijambobanga, urwego, ussd_pin, byemejwe) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [amazina, email, telefoni, hashedPin, 'umukoresha', pin, true]
  );
}

async function authenticateUser(telefoni, pin) {
  const [rows] = await pool.execute(
    'SELECT * FROM abakoresha WHERE telefoni = ? AND ussd_pin = ?',
    [telefoni, pin]
  );
  
  return rows.length > 0 ? rows[0] : null;
}

async function getProducts(telefoni) {
  const [rows] = await pool.execute(`
    SELECT p.* FROM ibicuruzwa p
    JOIN abakoresha a ON p.ubucuruzi_id = a.ubucuruzi_id
    WHERE a.telefoni = ?
    ORDER BY p.byaremwe DESC
    LIMIT 10
  `, [telefoni]);
  
  return rows;
}

async function getRecentTransactions(telefoni) {
  const [rows] = await pool.execute(`
    SELECT t.* FROM ibikorwa t
    JOIN abakoresha a ON t.ubucuruzi_id = a.ubucuruzi_id
    WHERE a.telefoni = ?
    ORDER BY t.byaremwe DESC
    LIMIT 5
  `, [telefoni]);
  
  return rows;
}

async function getTotalRevenue(telefoni) {
  const [rows] = await pool.execute(`
    SELECT COALESCE(SUM(igiciro_cyose), 0) as total FROM ibikorwa t
    JOIN abakoresha a ON t.ubucuruzi_id = a.ubucuruzi_id
    WHERE a.telefoni = ? AND t.ubwoko = 'igurisha'
  `, [telefoni]);
  
  return rows[0].total;
}

async function getTotalExpenses(telefoni) {
  const [rows] = await pool.execute(`
    SELECT COALESCE(SUM(amafaranga), 0) as total FROM amafaranga_yasohotse e
    JOIN abakoresha a ON e.ubucuruzi_id = a.ubucuruzi_id
    WHERE a.telefoni = ?
  `, [telefoni]);
  
  return rows[0].total;
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;