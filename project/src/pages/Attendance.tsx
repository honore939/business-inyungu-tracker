import React, { useState } from 'react';
import { Calendar, Check, Download, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { students, attendance } from '../data/mockData';
import { format } from 'date-fns';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(attendance[0]?.date || '');
  
  // Find the attendance record for the selected date
  const attendanceRecord = attendance.find(record => record.date === selectedDate);
  
  // Calculate attendance statistics
  const calculateStats = () => {
    if (!attendanceRecord) return { present: 0, absent: 0, late: 0, presentPercentage: 0 };
    
    const total = attendanceRecord.records.length;
    const present = attendanceRecord.records.filter(r => r.status === 'present').length;
    const absent = attendanceRecord.records.filter(r => r.status === 'absent').length;
    const late = attendanceRecord.records.filter(r => r.status === 'late').length;
    
    return {
      present,
      absent,
      late,
      presentPercentage: Math.round((present / total) * 100)
    };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Attendance</h1>
        <div className="mt-4 flex gap-3 sm:mt-0">
          <Button size="sm" variant="primary" className="gap-2">
            <Calendar className="h-4 w-4" />
            Take Attendance
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Dates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {attendance.map((record) => {
                  const formattedDate = format(new Date(record.date), 'MMM d, yyyy');
                  const isSelected = record.date === selectedDate;
                  
                  return (
                    <button
                      key={record.date}
                      className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => setSelectedDate(record.date)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{formattedDate}</span>
                        {isSelected && (
                          <span className="text-blue-600 dark:text-blue-400">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Present</p>
                    <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.present}</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-300">
                    <Check className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Absent</p>
                    <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{stats.absent}</p>
                  </div>
                  <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900 dark:text-red-300">
                    <X className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Late</p>
                    <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{stats.late}</p>
                  </div>
                  <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                    <Clock className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {selectedDate ? format(new Date(selectedDate), 'EEEE, MMMM d, yyyy') : 'No Date Selected'}
                </CardTitle>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                {attendanceRecord ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Grade
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {attendanceRecord.records.map((record) => {
                          const student = students.find(s => s.id === record.studentId);
                          if (!student) return null;
                          
                          let badgeVariant: 'blue' | 'green' | 'yellow' | 'red' | 'gray' = 'gray';
                          
                          switch (record.status) {
                            case 'present':
                              badgeVariant = 'green';
                              break;
                            case 'absent':
                              badgeVariant = 'red';
                              break;
                            case 'late':
                              badgeVariant = 'yellow';
                              break;
                          }
                          
                          return (
                            <tr key={record.studentId}>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full object-cover"
                                      src={student.avatar}
                                      alt={student.name}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {student.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                Grade {student.grade}-{student.section}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <Badge variant={badgeVariant}>
                                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No attendance data available for the selected date
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Clock component
const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Attendance;