import React from 'react';
import { DollarSign, Package, CreditCard, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
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
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { dashboardStats } from '../data/mockData';

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

const Dashboard = () => {
  const revenueData = {
    labels: ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena','Nyakanga', 'Kanama','Nzeri', 'Ukwakira', 'Ugushyingo', 'Ukuboza'],
    datasets: [
      {
        label: 'Ibyinyiye',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Ibyasohotse',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        backgroundColor: '#EF4444',
      },
    ],
  };

  const profitTrendData = {
    labels: ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena','Nyakanga', 'Kanama','Nzeri', 'Ukwakira', 'Ugushyingo', 'Ukuboza'],
    datasets: [
      {
        label: 'Inyungu ku kiranguzo',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Ikibaho</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amafaranga yose yinjiye</p>
              <p className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
                RWF{dashboardStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-800 dark:text-blue-300">
              <DollarSign className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Amafaranga yose yasohotse</p>
              <p className="text-3xl font-semibold text-red-600 dark:text-red-400">
                RWF{dashboardStats.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-800 dark:text-red-300">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Inyungu</p>
              <p className="text-3xl font-semibold text-green-600 dark:text-green-400">
                RWF{dashboardStats.netProfit.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-800 dark:text-green-300">
              <TrendingUp className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ibicuruzwa byose</p>
              <p className="text-3xl font-semibold text-amber-600 dark:text-amber-400">
                {dashboardStats.totalProducts}
              </p>
            </div>
            <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-800 dark:text-amber-300">
              <Package className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Amafaranga yinjiye n'ayasohotse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar options={chartOptions} data={revenueData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inyungu mu gihe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line options={chartOptions} data={profitTrendData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Ibikorwa bya vuba</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardStats.recentTransactions.map(transaction => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between border-l-4 border-blue-500 pl-4"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(transaction.timestamp), 'MMM d, h:mm a')}
                  </p>
                </div>
                <div className={`text-lg font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}RWF{Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;