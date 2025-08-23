import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { transactions as initialTransactions, products } from '../data/mockData';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'sale',
    productId: '',
    quantity: '',
    unitPrice: '',
    customerName: '',
    supplierName: ''
  });

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (transaction.customerName && transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (transaction.supplierName && transaction.supplierName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct) return;

    const newTransaction = {
      id: (transactions.length + 1).toString(),
      type: formData.type,
      productId: formData.productId,
      productName: selectedProduct.name,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
      totalAmount: Number(formData.quantity) * Number(formData.unitPrice),
      customerName: formData.type === 'sale' ? formData.customerName : undefined,
      supplierName: formData.type === 'purchase' ? formData.supplierName : undefined,
      date: new Date().toISOString().split('T')[0],
      status: 'Byarangiye'
    };

    setTransactions([newTransaction, ...transactions]);
    toast.success(`${formData.type === 'sale' ? 'Sale' : 'Purchase'} Igikorwa cyongeweho neza!`);
    
    setFormData({
      type: 'sale',
      productId: '',
      quantity: '',
      unitPrice: '',
      customerName: '',
      supplierName: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Transactions</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          +Ongeraho Igikorwa
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Shakisha igikorwa..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Ubwoko bwose</option>
            <option value="sale">Kugurisha</option>
            <option value="purchase">Kugura</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Amakuru ajyanye n'ibikorwa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Itariki
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Ubwoko bw'igikora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Ibicuruzwa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Umubare/Ingano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Igiciro cya kimwe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Igiteranyo cyose
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Inkomoko
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        transaction.type === 'sale' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {transaction.type === 'sale' ? 'Sale' : 'Purchase'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.productName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.quantity}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      RWF{transaction.unitPrice}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      RWF{transaction.totalAmount.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {transaction.customerName || transaction.supplierName || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Ongeraho igikorwa gishya</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ubwoko bw'igikorwa
                </label>
                <select
                  className="select mt-1"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="igurisha">Igurisha</option>
                  <option value="kugura">Kugura</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Icyicuruzwa
                </label>
                <select
                  className="select mt-1"
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  required
                >
                  <option value="">Hitamo icyicuruzwa</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.sellPrice} RWF
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Umubare/ingano
                </label>
                <input
                  type="number"
                  className="input mt-1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Igiciro cya kimwe
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input mt-1"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  required
                />
              </div>
              
              {formData.type === 'igurisha' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Izina ry'umukiriya
                  </label>
                  <input
                    type="text"
                    className="input mt-1"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Izina ry'uwagitanze
                  </label>
                  <input
                    type="text"
                    className="input mt-1"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    required
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                >
                  Hagarika
                </Button>
                <Button type="submit">
                  Ongeraho igikorwa
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;