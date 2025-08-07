import React, { useState } from 'react';
import { Bell, Check, Clock, Info, Send, Users, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { notifications, employees } from '../data/mockData';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [showSendForm, setShowSendForm] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'normal',
    recipients: [] as string[],
    sendMethod: 'both' // email, sms, both
  });

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending notification
    const selectedEmployees = employees.filter(emp => 
      notificationForm.recipients.includes(emp.id) || 
      notificationForm.recipients.includes('all')
    );
    
    let message = `Ubutumwa bwoherejwe ku bakozi ${selectedEmployees.length}`;
    
    if (notificationForm.sendMethod === 'email') {
      message += ' binyuze kuri email';
    } else if (notificationForm.sendMethod === 'sms') {
      message += ' binyuze ku butumwa bugufi';
    } else {
      message += ' binyuze kuri email n\'ubutumwa bugufi';
    }
    
    toast.success(message);
    
    // Reset form
    setNotificationForm({
      title: '',
      message: '',
      type: 'info',
      priority: 'normal',
      recipients: [],
      sendMethod: 'both'
    });
    setShowSendForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Amakuru</h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm">Menya byose nk'abyasomwe</Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setShowSendForm(true)}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Ohereza ubutumwa
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Amakuru ya vuba
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border p-4 ${
                  notification.unread
                    ? 'border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {notification.type === 'info' && (
                    <Info className="h-5 w-5 text-blue-600" />
                  )}
                  {notification.type === 'success' && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                  {notification.type === 'warning' && (
                    <Clock className="h-5 w-5 text-amber-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Igenamiterere ry'amakuru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Amakuru y'ibanze</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kwakira amakuru muri browser yawe
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Amakuru kuri email</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kwakira incamake y'amakuru buri munsi
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

      {/* Send Notification Modal */}
      {showSendForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Ohereza ubutumwa ku bakozi</h2>
            
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Umutwe w'ubutumwa
                </label>
                <input
                  type="text"
                  className="input mt-1"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ubutumwa
                </label>
                <textarea
                  className="input mt-1"
                  rows={4}
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ubwoko bw'ubutumwa
                  </label>
                  <select
                    className="select mt-1"
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value })}
                  >
                    <option value="info">Amakuru</option>
                    <option value="success">Intsinzi</option>
                    <option value="warning">Iburira</option>
                    <option value="error">Ikosa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Akamaro k'ubutumwa
                  </label>
                  <select
                    className="select mt-1"
                    value={notificationForm.priority}
                    onChange={(e) => setNotificationForm({ ...notificationForm, priority: e.target.value })}
                  >
                    <option value="low">Gito</option>
                    <option value="normal">Gisanzwe</option>
                    <option value="high">Gikomeye</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Abakozi bazakira ubutumwa
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={notificationForm.recipients.includes('all')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNotificationForm({ ...notificationForm, recipients: ['all'] });
                        } else {
                          setNotificationForm({ ...notificationForm, recipients: [] });
                        }
                      }}
                    />
                    Abakozi bose
                  </label>
                  
                  {!notificationForm.recipients.includes('all') && employees.map(employee => (
                    <label key={employee.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={notificationForm.recipients.includes(employee.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNotificationForm({
                              ...notificationForm,
                              recipients: [...notificationForm.recipients, employee.id]
                            });
                          } else {
                            setNotificationForm({
                              ...notificationForm,
                              recipients: notificationForm.recipients.filter(id => id !== employee.id)
                            });
                          }
                        }}
                      />
                      <div className="flex items-center">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span>{employee.name} - {employee.role}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Uburyo bwo kohereza
                </label>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="email"
                      className="mr-2"
                      checked={notificationForm.sendMethod === 'email'}
                      onChange={(e) => setNotificationForm({ ...notificationForm, sendMethod: e.target.value })}
                    />
                    <Mail className="h-4 w-4 mr-1" />
                    Email gusa
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="sms"
                      className="mr-2"
                      checked={notificationForm.sendMethod === 'sms'}
                      onChange={(e) => setNotificationForm({ ...notificationForm, sendMethod: e.target.value })}
                    />
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Ubutumwa bugufi gusa
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="sendMethod"
                      value="both"
                      className="mr-2"
                      checked={notificationForm.sendMethod === 'both'}
                      onChange={(e) => setNotificationForm({ ...notificationForm, sendMethod: e.target.value })}
                    />
                    <Users className="h-4 w-4 mr-1" />
                    Email n'ubutumwa bugufi
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowSendForm(false)}
                >
                  Hagarika
                </Button>
                <Button type="submit">
                  Ohereza ubutumwa
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;