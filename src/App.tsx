import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Transactions from './pages/Transactions';
import Expenses from './pages/Expenses';
import IncomeStatement from './pages/IncomeStatement';
import ProfitLoss from './pages/ProfitLoss';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent = () => {
  const { byinjiye, birakora } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || birakora) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-pulse rounded-full bg-blue-600 mx-auto"></div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Gufungura Sisitemu y'Ubucuruzi...
          </h1>
        </div>
      </div>
    );
  }

  if (!byinjiye) {
    return <AuthPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="income-statement" element={<IncomeStatement />} />
        <Route path="profit-loss" element={<ProfitLoss />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;