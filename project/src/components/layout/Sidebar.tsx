import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  CreditCard, 
  Receipt, 
  FileText, 
  TrendingUp, 
  Home, 
  User,
  X,
  DollarSign
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Ikibaho', href: '/', icon: Home },
    { name: 'Ibicuruzwa', href: '/products', icon: Package },
    { name: 'Ibikorwa', href: '/transactions', icon: CreditCard },
    { name: 'Amafaranga yasohotse', href: '/expenses', icon: Receipt },
    { name: 'Incamake y\'amafaranga', href: '/income-statement', icon: FileText },
    { name: 'Inyungu n\'igihombo', href: '/profit-loss', icon: TrendingUp },
    { name: 'Raporo', href: '/reports', icon: BarChart3 },
    { name: 'Umwirondoro', href: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden" 
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:relative md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto border-r border-gray-200 pt-5 dark:border-gray-700">
          <div className="flex items-center justify-between px-4">
            <Link to="/" className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Sisitemu y'Ubucuruzi
              </span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="btn-ghost btn rounded-md p-2 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-blue-600 dark:text-blue-300'
                        : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="/kivumu.jpg"
                alt="ARASUBIZWA Honore"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.amazina || 'Umukoresha'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;