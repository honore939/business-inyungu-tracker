import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Branding */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white">
              <div className="flex items-center mb-8">
                <DollarSign className="h-10 w-10 mr-3" />
                <h1 className="text-2xl lg:text-3xl font-bold">
                  Sisitemu y'Ubucuruzi
                </h1>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl lg:text-2xl font-semibold">
                  Genzura ubucuruzi bwawe neza
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                    <p className="text-blue-100">
                      Kugenzura ibicuruzwa n'ububiko
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                    <p className="text-blue-100">
                      Gukurikirana amafaranga yinjiye n'yasohotse
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                    <p className="text-blue-100">
                      Raporo z'imikorere y'ubucuruzi
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-2 mr-3"></div>
                    <p className="text-blue-100">
                      Sisitemu ikora neza kuri smartphone
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Forms */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
              {isLogin ? (
                <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;