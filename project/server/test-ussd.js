// Test USSD functionality
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Simulate USSD request
const testUSSD = async () => {
  const testData = {
    sessionId: 'test-session-123',
    serviceCode: '*182*7#',
    phoneNumber: '+250788123456',
    text: ''
  };

  console.log('🧪 Kugerageza USSD...');
  console.log('📞 Telefoni:', testData.phoneNumber);
  console.log('🔢 Kode:', testData.serviceCode);
  
  try {
    const response = await fetch('http://localhost:5000/ussd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(testData)
    });
    
    const result = await response.text();
    console.log('✅ Igisubizo:', result);
  } catch (error) {
    console.error('❌ Ikosa:', error.message);
  }
};

// Test different USSD flows
const testUSSDFlows = async () => {
  const flows = [
    { text: '', description: 'Gutangira' },
    { text: '1', description: 'Guhanga konti' },
    { text: '1*1', description: 'Injiza amazina' },
    { text: '1*1*Jean UWIMANA', description: 'Amazina yashyizweho' },
    { text: '1*1*Jean UWIMANA*2', description: 'Injiza email' },
    { text: '1*1*Jean UWIMANA*2*jean@example.com', description: 'Email yashyizweho' },
    { text: '1*1*Jean UWIMANA*2*jean@example.com*3', description: 'Injiza PIN' },
    { text: '1*1*Jean UWIMANA*2*jean@example.com*3*123456', description: 'PIN yashyizweho' }
  ];

  for (const flow of flows) {
    console.log(`\n🔄 ${flow.description}:`);
    
    const testData = {
      sessionId: 'test-session-456',
      serviceCode: '*182*7#',
      phoneNumber: '+250788654321',
      text: flow.text
    };

    try {
      const response = await fetch('http://localhost:5000/ussd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(testData)
      });
      
      const result = await response.text();
      console.log('📱 Igisubizo:', result);
      
      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('❌ Ikosa:', error.message);
    }
  }
};

// Run tests
console.log('🚀 Gutangiza test ya USSD...\n');

setTimeout(() => {
  testUSSD();
  
  setTimeout(() => {
    console.log('\n' + '='.repeat(50));
    console.log('🧪 Kugerageza flows zinyuranye...\n');
    testUSSDFlows();
  }, 2000);
}, 1000);