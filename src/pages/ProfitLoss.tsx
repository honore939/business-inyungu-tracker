import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { transactions, expenses } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ProfitLoss = () => {
  const [period, setPeriod] = useState('monthly');

  // Calculate monthly P&L data
  const monthlyData = {
    labels: ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena','Nyakanga', 'Kanama','Nzeri', 'Ukwakira', 'Ugushyingo', 'Ukuboza'],
    revenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    expenses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    profit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  // Calculate current period totals
  const currentRevenue = monthlyData.revenue.reduce((sum, val) => sum + val, 0);
  const currentExpenses = monthlyData.expenses.reduce((sum, val) => sum + val, 0);
  const currentProfit = currentRevenue - currentExpenses;
  const profitMargin = (currentProfit / currentRevenue) * 100;

  // Previous period for comparison (mock data)
  const previousProfit = 0;
  const profitChange = ((currentProfit - previousProfit) / previousProfit) * 100;

  const chartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: monthlyData.revenue,
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Expenses',
        data: monthlyData.expenses,
        backgroundColor: '#EF4444',
      },
      {
        label: 'Profit',
        data: monthlyData.profit,
        backgroundColor: '#10B981',
      },
    ],
  };

  const profitTrendData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Profit Trend',
        data: monthlyData.profit,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Inyungu n'igihombo</h1>
        <div className="mt-4 flex gap-3 sm:mt-0">
          <select
            className="select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="daily">Umunsi</option>
            <option value="weekly">Icyumweru</option>
            <option value="monthly">Ukwezi</option>
            <option value="yearly">Umwaka</option>
          </select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Kora/sohora 
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  RWF{currentRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
                <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                  RWF{currentExpenses.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inyungu ku bicuruzwa</p>
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                  RWF{currentProfit.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  {profitChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${profitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(profitChange).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Profit Margin</p>
                <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Amafaranga, ibyasohotse & Inyungu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Uko inyungu yiyongera</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line options={chartOptions} data={profitTrendData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed P&L Table */}
      <Card>
        <CardHeader>
          <CardTitle>Amakuru y'ukwezi kose</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Ukwezi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Amafaranga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Ibyasohotse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Inyungu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Ijanisha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {monthlyData.labels.map((month, index) => {
                  const revenue = monthlyData.revenue[index];
                  const expenses = monthlyData.expenses[index];
                  const profit = monthlyData.profit[index];
                  const margin = (profit / revenue) * 100;

                  return (
                    <tr key={month}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {month}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-blue-600 dark:text-blue-400">
                        RWF{revenue.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600 dark:text-red-400">
                        RWF{expenses.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">
                        RWF{profit.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {margin.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitLoss;