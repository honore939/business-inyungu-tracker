import { Bell, LogOut, Search, Settings, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { user, gusohoka } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button
            onClick={onMenuClick}
            className="btn-ghost btn rounded-md p-2"
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="relative hidden flex-1 md:block lg:max-w-xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="input pl-10"
              placeholder="Shakisha ibicuruzwa, ibikorwa, n'ibindi..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            className="btn-ghost btn rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          
          <button 
            className="btn-ghost btn rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700" 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </button>
          
          <button 
            className="btn-ghost btn rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700" 
            onClick={() => navigate('/profile')}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          <div className="relative ml-3">
            <div className="flex items-center">
              <Link
                to="/profile"
                className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700"
                aria-label="User menu"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="/kivumu.jpg"
                  alt={user?.amazina || 'User'}
                />
              </Link>
            </div>
          </div>

          <button 
            className="btn-ghost btn rounded-full p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" 
            onClick={gusohoka}
            aria-label="Log out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;