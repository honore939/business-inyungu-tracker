import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Book, 
  Calendar, 
  Clock, 
  Edit, 
  MapPin, 
  Printer, 
  Trash2, 
  User, 
  Users 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { courses, students } from '../data/mockData';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  
  if (!course) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Course Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="btn-primary btn mt-4">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }
  
  // Get enrolled students
  const enrolledStudents = students.filter((student) => 
    student.courses.includes(course.id)
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link to="/courses" className="btn-ghost btn rounded-full p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Course Details
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
        {/* Course Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              <Book className="h-8 w-8" />
            </div>
            <div className="text-center">
              <CardTitle>{course.name}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {course.code}
              </p>
              <div className="mt-2">
                <Badge variant={course.status === 'Active' ? 'green' : 'gray'}>
                  {course.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enrollment</p>
                  <p className="font-medium">{course.enrolledStudents} / {course.maxCapacity} students</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Book className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Credits</p>
                  <p className="font-medium">{course.credits} credits</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Schedule</p>
                  <p className="font-medium">{course.schedule}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium">{course.room}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grade Level</p>
                  <p className="font-medium">Grade {course.grade}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Course Details Cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Course Description */}
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {course.description}
              </p>
              
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Classes</p>
                  <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">45</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-semibold text-green-600 dark:text-green-400">12</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-900/20">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Remaining</p>
                  <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">33</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Enrolled Students */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Enrolled Students</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enrolledStudents.slice(0, 5).map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Grade {student.grade}-{student.section}
                        </p>
                      </div>
                    </div>
                    <Link 
                      to={`/students/${student.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </Link>
                  </div>
                ))}
                
                {enrolledStudents.length > 5 && (
                  <div className="text-center">
                    <Button variant="ghost" size="sm">
                      View {enrolledStudents.length - 5} more students
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div>
                    <p className="font-medium">Midterm Exam</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: Oct 15, 2023</p>
                  </div>
                  <Badge variant="yellow">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div>
                    <p className="font-medium">Research Paper</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: Oct 30, 2023</p>
                  </div>
                  <Badge variant="yellow">Upcoming</Badge>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <div>
                    <p className="font-medium">Group Project</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: Nov 10, 2023</p>
                  </div>
                  <Badge variant="blue">Not Started</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;