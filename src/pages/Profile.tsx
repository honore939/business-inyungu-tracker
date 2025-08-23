import React, { useState } from 'react';
import { Camera, Key, Mail, Phone, User, Building, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { businessTypes, currencies } from '../data/mockData';
import toast from 'react-hot-toast';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'ARASUBIZWA',
    lastName: 'Honore',
    email: 'honore@tradeflow.rw',
    phone: '+250790251138',
    businessName: 'Ubucuruzi bwa ARASUBIZWA',
    businessType: 'Ubucuruzi',
    currency: 'RWF',
    address: 'Kigali, Rwanda',
    taxId: 'RW123456789'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Konti yahinduwe neza!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Emeza ijambobanga rishya ry\'ukuri!');
      return;
    }
    toast.success('Ijambobanga ryahinduwe neza!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Igenamiterere ry'umwirondoro</h1>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Amakuru y'umwirondoro
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'business'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Amakuru y'ubucuruzi
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Umutekano
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Picture Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="relative mx-auto h-32 w-32">
                <img
                  src="/kivumu.jpg"
                  alt="ARASUBIZWA Honore"
                  className="h-full w-full rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profileData.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profileData.businessName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Amakuru y'umuntu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Izina rya mbere
                      </label>
                      <input 
                        type="text" 
                        className="input mt-1" 
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Izina rya nyuma
                      </label>
                      <input 
                        type="text" 
                        className="input mt-1" 
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Aderesi ya email
                    </label>
                    <input 
                      type="email" 
                      className="input mt-1" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nimero ya telefoni
                    </label>
                    <input 
                      type="tel" 
                      className="input mt-1" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" variant="primary">Bika impinduka</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Amakuru y'ubucuruzi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Izina ry'ubucuruzi
                    </label>
                    <input 
                      type="text" 
                      className="input mt-1" 
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ubwoko bw'ubucuruzi
                    </label>
                    <select 
                      className="select mt-1"
                      value={profileData.businessType}
                      onChange={(e) => setProfileData({...profileData, businessType: e.target.value})}
                    >
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ifaranga rikoreshwa
                    </label>
                    <select 
                      className="select mt-1"
                      value={profileData.currency}
                      onChange={(e) => setProfileData({...profileData, currency: e.target.value})}
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Aho ubucuruzi buherereye
                    </label>
                    <input 
                      type="text" 
                      className="input mt-1" 
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nomero y'umusanzu
                    </label>
                    <input 
                      type="text" 
                      className="input mt-1" 
                      value={profileData.taxId}
                      onChange={(e) => setProfileData({...profileData, taxId: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" variant="primary">Koresha amakuru y'ubucuruzi</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  Guhindura ijambo ry'ibanga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ijambo ry'ibanga rihari
                    </label>
                    <input 
                      type="password" 
                      className="input mt-1"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ijambo ry'ibanga rishya
                    </label>
                    <input 
                      type="password" 
                      className="input mt-1"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Emeza ijambo ry'ibanga rishya
                    </label>
                    <input 
                      type="password" 
                      className="input mt-1"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" variant="primary">Hindura ijambo ry'ibanga</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Igenamiterere ry'amakuru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Amakuru kuri email</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Kwakira amakuru kuri email ku bijyanye n'ubucuruzi bwawe
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Amakuru y'ibicuruzwa bigiye kurangira</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Kwakira amakuru iyo ibicuruzwa bigiye kurangira
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" defaultChecked />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Raporo za buri kwezi</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Kwakira raporo za buri kwezi z'imikorere y'ubucuruzi
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;