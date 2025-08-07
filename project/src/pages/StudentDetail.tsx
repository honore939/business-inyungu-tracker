import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Edit, 
  Mail, 
  MapPin, 
  Phone, 
  Printer, 
  School, 
  Trash2, 
  User 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { students, courses, grades } from '../data/mockData';

const StudentDetail = () => {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);
  
  if (!student) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Student Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The student you're looking for doesn't exist or has been removed.</p>
          <Link to="/students" className="btn-primary btn mt-4">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }
  
  // Get student's courses
  const studentCourses = courses.filter((course) => 
    student.courses.includes(course.id)
  );
  
  // Get student's grades
  const studentGrades = grades.filter((grade) => 
    grade.studentId === student.id
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link to="/students" className="btn-ghost btn rounded-full p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Student Profile
          </h1>
        </div>
        
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="error" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Student Info Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <h2 className="mt-4 text-xl font-semibold">{student.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Student ID: {student.id}
              </p>
              
              <div className="mt-2">
                <Badge variant={student.status === 'Active' ? 'green' : 'red'}>
                  {student.status}
                </Badge>
              </div>
              
              <div className="mt-6 space-y-4 text-left">
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="font-medium">{student.gender}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="font-medium">{student.dob}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <School className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Grade & Section</p>
                    <p className="font-medium">Grade {student.grade}-{student.section}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Student Details Cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Parent Information */}
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium">{student.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Relationship</p>
                    <p className="font-medium">Parent</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{student.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{student.parentPhone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">GPA</p>
                  <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{student.gpa.toFixed(1)}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance</p>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{student.attendance}%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Enrolled Since</p>
                  <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{student.enrollmentDate.split('-')[0]}</p>
                </div>
              </div>
              
              <div>
                <h4 className="mb-3 font-medium">Enrolled Courses</h4>
                <div className="space-y-2">
                  {studentCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                    >
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{course.code} • {course.instructor}</p>
                      </div>
                      <Link 
                        to={`/courses/${course.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
              {studentGrades.length > 0 ? (
                <div className="space-y-4">
                  {studentGrades.map((gradeRecord) => {
                    const course = courses.find(c => c.id === gradeRecord.courseId);
                    
                    return (
                      <div key={`${gradeRecord.studentId}-${gradeRecord.courseId}`}>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">{course?.name}</h4>
                          <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Final: {gradeRecord.finalGrade}%
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {gradeRecord.assignments.map((assignment, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900"
                            >
                              <span>{assignment.name}</span>
                              <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No grade records available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;