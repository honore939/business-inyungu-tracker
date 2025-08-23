import React, { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState({
    startDate: '2025-01-01',
    endDate: '2025-12-31'
  });

  // Mock data for different report types
  const salesData = {
    labels: ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena','Nyakanga', 'Kanama','Nzeri', 'Ukwakira', 'Ugushyingo', 'Ukuboza'],
    datasets: [
      {
        label: 'Ibyagurishijwe',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const expenseData = {
    labels: ['Ubukode', 'Ibikorwa by\'ingenzi', 'Ibijyanye n\'isoko', 'Ibyihutirwa', 'Ingendo/Ubwikorezi', 'Ubwishingizi', 'Ibindi'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#8B5CF6',
          '#F97316',
        ],
      },
    ],
  };

  const profitTrendData = {
    labels: ['Mutarama', 'Gashyantare', 'Werurwe', 'Mata', 'Gicurasi', 'Kamena','Nyakanga', 'Kanama','Nzeri', 'Ukwakira', 'Ugushyingo', 'Ukuboza'],
    datasets: [
      {
        label: 'Inyungu',
        data: [4000, 7000, 5000, 10000, 8000, 12000],
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

  const generateReport = () => {
    // In a real app, this would generate and download the report
    toast.success('Raporo yakozwe neza!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</h1>
        <Button onClick={generateReport} className="mt-4 sm:mt-0">
          <Download className="h-4 w-4 mr-2" />
          Kora Raporo
        </Button>
      </div>

      {/* Report Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ubwoko bwa Raporo
              </label>
              <select
                className="select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Raporo y'ibyaranguwe</option>
                <option value="expenses">Raporo y'ibyasohotse</option>
                <option value="profit">Isesengura ry'inyungu</option>
                <option value="inventory">Raporo y'ububiko</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Igihe byatangiriye
                </label>
                <input
                  type="date"
                  className="input"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Igihe byarangiriye
                </label>
                <input
                  type="date"
                  className="input"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Visualization */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {reportType === 'sales' && 'Sales Performance'}
              {reportType === 'expenses' && 'Expense Breakdown'}
              {reportType === 'profit' && 'Profit Trend'}
              {reportType === 'inventory' && 'Inventory Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {reportType === 'sales' && <Bar options={chartOptions} data={salesData} />}
              {reportType === 'expenses' && <Doughnut options={chartOptions} data={expenseData} />}
              {reportType === 'profit' && <Line options={chartOptions} data={profitTrendData} />}
              {reportType === 'inventory' && <Bar options={chartOptions} data={salesData} />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Isesengura ryimbitse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Igiteranyo cy'amafaranga yose</p>
                  <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">0RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inyungu ku bicuruzwa</p>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">0RWF</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ijanisha ry'inyungu</p>
                  <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">0%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Raporo ziheruka gukorwa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Raporo y\'ibyaguzwe', date: '2024-03-31', type: 'Ibyaguzwe' },
              { name: 'Isesengura ry\'amafaranga yasohotse mu kwezi', date: '2024-02-29', type: 'Amafaranga yasohotse' },
              { name: 'Inyungu n\'igihombo', date: '2024-02-28', type: 'Amafaranga' },
              { name: 'Agaciro k\'ibiri mu bubiko', date: '2024-02-15', type: 'Ububiko' },
            ].map((report, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {report.type} • Yakozwe kuwa {report.date}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Inyandikorugero za raporo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Incamake y\'igurisha', description: 'Incamake y\'imikorere y\'igurisha buri kwezi' },
              { name: 'Isesengura ry\'amafaranga yasohotse', description: 'Ibisobanuro birambuye by\'amafaranga yasohotse yose' },
              { name: 'Inyungu n\'igihombo', description: 'Raporo yuzuye y\'inyungu n\'igihombo' },
              { name: 'Imigendekere y\'amafaranga', description: 'Isesengura ry\'amafaranga yinjira n\'asohoka' },
            ].map((template, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{template.description}</p>
                <Button variant="ghost" size="sm" className="w-full">
                  Kora raporo
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;