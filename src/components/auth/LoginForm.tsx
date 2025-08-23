import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { loginSchema, LoginFormData } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { kwinjira, birakora } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    await kwinjira(data);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Injira muri sisitemu
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Injiza amakuru yawe yo kwinjira
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className={`input mt-1 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Injiza email yawe"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ijambobanga
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('ijambobanga')}
              className={`input pr-10 ${errors.ijambobanga ? 'border-red-500' : ''}`}
              placeholder="Injiza ijambobanga ryawe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.ijambobanga && (
            <p className="mt-1 text-sm text-red-600">{errors.ijambobanga.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={birakora}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Injira
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ntufite konti?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Hanga konti nshya
            </button>
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            Demo Account:
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-300">
            Email: honore@tradeflow.rw<br />
            Ijambobanga: 123456
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;