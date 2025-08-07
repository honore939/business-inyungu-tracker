import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { transactions, expenses } from '../data/mockData';

const IncomeStatement = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  });

  // Calculate revenue from sales
  const salesTransactions = transactions.filter(t => 
    t.type === 'sale' && 
    t.date >= dateRange.startDate && 
    t.date <= dateRange.endDate
  );
  
  const totalRevenue = salesTransactions.reduce((sum, t) => sum + t.totalAmount, 0);

  // Calculate cost of goods sold (COGS) from purchases
  const purchaseTransactions = transactions.filter(t => 
    t.type === 'purchase' && 
    t.date >= dateRange.startDate && 
    t.date <= dateRange.endDate
  );
  
  const totalCOGS = purchaseTransactions.reduce((sum, t) => sum + t.totalAmount, 0);

  // Calculate gross profit
  const grossProfit = totalRevenue - totalCOGS;

  // Calculate operating expenses
  const operatingExpenses = expenses.filter(e => 
    e.date >= dateRange.startDate && 
    e.date <= dateRange.endDate
  );
  
  const totalOperatingExpenses = operatingExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate net income
  const netIncome = grossProfit - totalOperatingExpenses;

  // Group expenses by category
  const expensesByCategory = operatingExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const exportStatement = () => {
    // In a real app, this would generate a PDF or CSV
    toast.success('Income statement exported successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Income Statement</h1>
        <Button onClick={exportStatement} className="mt-4 sm:mt-0">
          <Download className="h-4 w-4 mr-2" />
          Export Statement
        </Button>
      </div>

      {/* Date Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium">Period:</span>
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                className="input"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
              <span className="flex items-center text-gray-500">to</span>
              <input
                type="date"
                className="input"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Income Statement</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For the period {dateRange.startDate} to {dateRange.endDate}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Revenue Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Revenue</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sales Revenue</span>
                  <span className="font-medium">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Revenue</span>
                    <span>${totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost of Goods Sold */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Cost of Goods Sold</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Inventory Purchases</span>
                  <span className="font-medium">${totalCOGS.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total COGS</span>
                    <span>${totalCOGS.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gross Profit */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex justify-between text-lg font-semibold text-green-600 dark:text-green-400">
                <span>Gross Profit</span>
                <span>${grossProfit.toLocaleString()}</span>
              </div>
            </div>

            {/* Operating Expenses */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Operating Expenses</h3>
              <div className="space-y-2">
                {Object.entries(expensesByCategory).map(([category, amount]) => (
                  <div key={category} className="flex justify-between">
                    <span>{category}</span>
                    <span className="font-medium">${amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Operating Expenses</span>
                    <span>${totalOperatingExpenses.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Income */}
            <div className={`p-4 rounded-lg ${
              netIncome >= 0 
                ? 'bg-green-50 dark:bg-green-900/20' 
                : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className={`flex justify-between text-xl font-bold ${
                netIncome >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <span>Net Income</span>
                <span>${netIncome.toLocaleString()}</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Gross Margin</p>
                <p className="text-lg font-semibold">
                  {totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Operating Margin</p>
                <p className="text-lg font-semibold">
                  {totalRevenue > 0 ? (((grossProfit - totalOperatingExpenses) / totalRevenue) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Net Margin</p>
                <p className="text-lg font-semibold">
                  {totalRevenue > 0 ? ((netIncome / totalRevenue) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeStatement;