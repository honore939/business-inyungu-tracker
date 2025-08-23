// Mock data for products
export const products = [
  {
    id: '1',
    name: 'Telefoni ya iPhone 16 Pro',
    category: 'Tekinoroji',
    sku: 'IP16-001',
    buyPrice: 1000000,
    sellPrice: 1500000,
    quantity: 25,
    description: 'Telefoni nziza ya iPhone ifite tekinoroji igezweho',
    supplier: 'Apple Inc.',
    dateAdded: '15/01/2025',
    status: 'Irahari'
  },
  {
    id: '2',
    name: 'Telefoni ya Galaxy S24',
    category: 'Tekinoroji',
    sku: 'SG24-002',
    buyPrice: 400000,
    sellPrice: 500000,
    quantity: 18,
    description: 'Telefoni nziza ikoresha Android',
    supplier: 'Samsung Electronics',
    dateAdded: '20/01/2025',
    status: 'Irahari'
  },
  {
    id: '3',
    name: 'Mudasobwa MacBook Air',
    category: 'Mudasobwa',
    sku: 'MBA-003',
    buyPrice: 1500000,
    sellPrice: 1800000,
    quantity: 12,
    description: 'Mudasobwa yoroshye kandi ikora neza',
    supplier: 'Apple Inc.',
    dateAdded: '01/02/2025',
    status: 'Irahari'
  }
];

// Mock data for transactions
export const transactions = [
  {
    id: '1',
    type: 'igurisha',
    productId: '1',
    productName: 'Telefoni ya iPhone 16 Pro',
    quantity: 2,
    unitPrice: 1200,
    totalAmount: 2400,
    customerName: 'ARASUBIZWA Honore',
    date: '25/01/2024',
    status: 'Byarangiye'
  },
  {
    id: '2',
    type: 'kugura',
    productId: '2',
    productName: 'Telefoni ya Galaxy S24',
    quantity: 10,
    unitPrice: 700,
    totalAmount: 7000,
    supplierName: 'Samsung Electronics',
    date: '22/01/2024',
    status: 'Byarangiye'
  },
  {
    id: '3',
    type: 'igurisha',
    productId: '3',
    productName: 'Mudasobwa MacBook Air',
    quantity: 1,
    unitPrice: 1500,
    totalAmount: 1500,
    customerName: 'UWIMANA Marie',
    date: '05/02/2024',
    status: 'Byarangiye'
  }
];

// Mock data for expenses
export const expenses = [
  {
    id: '1',
    category: 'Kode',
    description: 'Kode y\'ibiro mu kwezi kwa mbere',
    amount: 2000,
    date: '01/01/2024',
    paymentMethod: 'Banki',
    status: 'Byishyuwe'
  },
  {
    id: '2',
    category: 'Amashanyarazi',
    description: 'Kwishyura amashanyarazi',
    amount: 150,
    date: '15/01/2024',
    paymentMethod: 'Ikarita',
    status: 'Byishyuwe'
  },
  {
    id: '3',
    category: 'Kwamamaza',
    description: 'Kwamamaza kuri social media',
    amount: 500,
    date: '20/01/2024',
    paymentMethod: 'PayPal',
    status: 'Byishyuwe'
  },
  {
    id: '4',
    category: 'Ibikoresho',
    description: 'Ibikoresho by\'ibiro',
    amount: 200,
    date: '01/02/2024',
    paymentMethod: 'Amafaranga',
    status: 'Byishyuwe'
  }
];

// Business types
export const businessTypes = [
  'Ubucuruzi',
  'Serivisi',
  'Ubuhinzi',
  'Inganda',
  'Ubwubatsi',
  'Ibiryo',
  'Ubuvuzi',
  'Uburezi',
  'Ikoranabuhanga',
  'Ubundi'
];

// Currencies
export const currencies = [
  { code: 'RWF', name: 'Amafaranga y\'u Rwanda', symbol: 'RWF' },
  { code: 'USD', name: 'Amadolari y\'Amerika', symbol: '$' },
  { code: 'EUR', name: 'Amayero', symbol: '€' },
  { code: 'KES', name: 'Amafaranga ya Kenya', symbol: 'KSh' },
  { code: 'UGX', name: 'Amafaranga ya Uganda', symbol: 'UGX' },
  { code: 'TZS', name: 'Amafaranga ya Tanzania', symbol: 'TSh' }
];

// Dashboard statistics
export const dashboardStats = {
  totalRevenue: 45600,
  totalExpenses: 12850,
  netProfit: 32750,
  totalProducts: 55,
  totalTransactions: 128,
  monthlyGrowth: 12.5,
  recentTransactions: [
    {
      id: 1,
      type: 'igurisha',
      description: 'Kugurisha iPhone 15',
      amount: 1200,
      timestamp: '10/02/2024 14:32'
    },
    {
      id: 2,
      type: 'amafaranga_yasohotse',
      description: 'Kugura ibikoresho',
      amount: -200,
      timestamp: '10/02/2024 11:15'
    },
    {
      id: 3,
      type: 'igurisha',
      description: 'Kugurisha MacBook Air',
      amount: 1500,
      timestamp: '09/02/2024 16:45'
    }
  ]
};

// Notifications system for manager
export const notifications = [
  {
    id: 1,
    type: 'info',
    title: 'Amakuru mashya',
    message: 'Sisitemu izakorwa maintenance ejo nijoro saa 4.',
    time: '2 amasaha ashize',
    unread: true,
    priority: 'normal',
    recipients: ['all']
  },
  {
    id: 2,
    type: 'success',
    title: 'Igurisha ryagenze neza',
    message: 'Igurisha rya iPhone 15 ryarangiye neza.',
    time: '5 amasaha ashize',
    unread: true,
    priority: 'normal',
    recipients: ['sales_team']
  },
  {
    id: 3,
    type: 'warning',
    title: 'Ibicuruzwa bigiye kurangira',
    message: 'Samsung Galaxy S24 igiye kurangira (18 gusa bisigaye).',
    time: '1 umunsi ushize',
    unread: true,
    priority: 'high',
    recipients: ['inventory_team', 'manager']
  }
];

// Employee data for notifications
export const employees = [
  {
    id: '1',
    name: 'ARASUBIZWA Honore',
    email: 'honore@tradeflow.rw',
    phone: '+250790251138',
    role: 'Umuyobozi',
    department: 'Ubuyobozi',
    avatar: '/kivumu.jpg'
  },
  {
    id: '2',
    name: 'UWIMANA Marie',
    email: 'marie@tradeflow.rw',
    phone: '+250788123456',
    role: 'Umukozi w\'igurisha',
    department: 'Igurisha',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'NIYONZIMA Jean',
    email: 'jean@tradeflow.rw',
    phone: '+250787654321',
    role: 'Umukozi w\'ububiko',
    department: 'Ububiko',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];