import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, UserPlus, Camera } from 'lucide-react';
import { registerSchema, RegisterFormData } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import CameraCapture from './CameraCapture';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { guhangaKonti, birakora } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showCamera, setShowCamera] = React.useState(false);
  const [profilePhoto, setProfilePhoto] = React.useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const urwego = watch('urwego');

  const ubwokoUbucuruzi = [
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

  const amafaranga = [
    { code: 'RWF', name: 'Amafaranga y\'u Rwanda', symbol: 'RWF' },
    { code: 'USD', name: 'Amadolari y\'Amerika', symbol: '$' },
    { code: 'EUR', name: 'Amayero', symbol: '€' },
    { code: 'KES', name: 'Amafaranga ya Kenya', symbol: 'KSh' },
    { code: 'UGX', name: 'Amafaranga ya Uganda', symbol: 'UGX' },
    { code: 'TZS', name: 'Amafaranga ya Tanzania', symbol: 'TSh' }
  ];

  const handleImageCapture = (file: File) => {
    setProfilePhoto(file);
  };

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key as keyof RegisterFormData] as string);
    });
    if (profilePhoto) {
      formData.append('ifoto', profilePhoto);
    }
    await guhangaKonti(formData);
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hanga konti nshya
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Uzuza amakuru yawe yo guhanga konti
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Ifoto y'umukoresha */}
        <div className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            {profilePhoto ? (
              <img
                src={URL.createObjectURL(profilePhoto)}
                alt="Ifoto yawe"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowCamera(true)}
            className="gap-2"
          >
            <Camera className="h-4 w-4" />
            {profilePhoto ? 'Hindura ifoto' : 'Shyiramo ifoto yawe'}
          </Button>
        </div>

        {/* Amakuru y'ibanze */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amazina yawe yose
            </label>
            <input
              type="text"
              {...register('amazina')}
              className={`input mt-1 ${errors.amazina ? 'border-red-500' : ''}`}
              placeholder="Injiza amazina yawe"
            />
            {errors.amazina && (
              <p className="mt-1 text-sm text-red-600">{errors.amazina.message}</p>
            )}
          </div>

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
              Nimero ya telefoni
            </label>
            <input
              type="tel"
              {...register('telefoni')}
              className={`input mt-1 ${errors.telefoni ? 'border-red-500' : ''}`}
              placeholder="+250788123456"
            />
            {errors.telefoni && (
              <p className="mt-1 text-sm text-red-600">{errors.telefoni.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Urwego rwawe
            </label>
            <select
              {...register('urwego')}
              className={`select mt-1 ${errors.urwego ? 'border-red-500' : ''}`}
            >
              <option value="">Hitamo urwego rwawe</option>
              <option value="umuyobozi">Umuyobozi</option>
              <option value="umukozi">Umukozi</option>
              <option value="umukoresha">Umukoresha</option>
            </select>
            {errors.urwego && (
              <p className="mt-1 text-sm text-red-600">{errors.urwego.message}</p>
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
                placeholder="Injiza ijambobanga"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Emeza ijambobanga
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('kwemezaIjambobanga')}
                className={`input pr-10 ${errors.kwemezaIjambobanga ? 'border-red-500' : ''}`}
                placeholder="Emeza ijambobanga"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.kwemezaIjambobanga && (
              <p className="mt-1 text-sm text-red-600">{errors.kwemezaIjambobanga.message}</p>
            )}
          </div>
        </div>

        {/* Amakuru y'ubucuruzi (ku bayobozi gusa) */}
        {urwego === 'umuyobozi' && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Amakuru y'ubucuruzi bwawe
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Izina ry'ubucuruzi
                </label>
                <input
                  type="text"
                  {...register('ubucuruzi.izina')}
                  className="input mt-1"
                  placeholder="Injiza izina ry'ubucuruzi bwawe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ubwoko bw'ubucuruzi
                </label>
                <select
                  {...register('ubucuruzi.ubwoko')}
                  className="select mt-1"
                >
                  <option value="">Hitamo ubwoko</option>
                  {ubwokoUbucuruzi.map(ubwoko => (
                    <option key={ubwoko} value={ubwoko}>{ubwoko}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ifaranga rikoreshwa
                </label>
                <select
                  {...register('ubucuruzi.ifaranga')}
                  className="select mt-1"
                >
                  <option value="">Hitamo ifaranga</option>
                  {amafaranga.map(faranga => (
                    <option key={faranga.code} value={faranga.code}>
                      {faranga.name} ({faranga.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Aderesi y'ubucuruzi
                </label>
                <input
                  type="text"
                  {...register('ubucuruzi.aderesi')}
                  className="input mt-1"
                  placeholder="Injiza aderesi y'ubucuruzi"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nimero y'umusanzu (optional)
                </label>
                <input
                  type="text"
                  {...register('ubucuruzi.numeroYumusanzu')}
                  className="input mt-1"
                  placeholder="Injiza nimero y'umusanzu"
                />
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={birakora}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Hanga konti
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Usanzwe ufite konti?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Injira hano
            </button>
          </p>
        </div>
      </form>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onImageCapture={handleImageCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default RegisterForm;