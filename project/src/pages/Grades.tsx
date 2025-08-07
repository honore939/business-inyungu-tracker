import React, { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import DataTable from '../components/ui/DataTable';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { students, courses, grades } from '../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grades = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  
  // Function to calculate average grades per course
  const calculateAverageGrades = () => {
    const coursesWithAvg = courses.map(course => {
      const courseGrades = grades.filter(g => g.courseId === course.id);
      const avgGrade = courseGrades.length > 0 
        ? courseGrades.reduce((sum, g) => sum + g.finalGrade, 0) / courseGrades.length 
        : 0;
      
      return {
        id: course.id,
        name: course.name,
        code: course.code,
        avgGrade: Math.round(avgGrade)
      };
    });
    
    return coursesWithAvg;
  };
  
  const averageGrades = calculateAverageGrades();
  
  // Prepare data for chart
  const chartData = {
    labels: averageGrades.map(course => course.code),
    datasets: [
      {
        label: 'Average Grade',
        data: averageGrades.map(course => course.avgGrade),
        backgroundColor: '#3B82F6',
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };
  
  // Prepare data for the table
  const prepareGradeData = () => {
    // Flatten grades data
    const flattenedGrades = grades.map(grade => {
      const student = students.find(s => s.id === grade.studentId);
      const course = courses.find(c => c.id === grade.courseId);
      
      return {
        id: `${grade.studentId}-${grade.courseId}`,
        studentId: grade.studentId,
        studentName: student?.name || 'Unknown',
        studentAvatar: student?.avatar,
        courseId: grade.courseId,
        courseName: course?.name || 'Unknown',
        courseCode: course?.code || '',
        finalGrade: grade.finalGrade,
        assignments: grade.assignments,
      };
    });
    
    // Filter by selected course if needed
    if (selectedCourse !== 'all') {
      return flattenedGrades.filter(grade => grade.courseId === selectedCourse);
    }
    
    return flattenedGrades;
  };
  
  const gradeData = prepareGradeData();
  
  // Table columns
  const columns = [
    {
      id: 'student',
      header: 'Student',
      cell: (row: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={row.studentAvatar}
              alt={row.studentName}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {row.studentName}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'course',
      header: 'Course',
      cell: (row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {row.courseName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.courseCode}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'assignments',
      header: 'Assignments',
      cell: (row: any) => (
        <div className="text-sm text-gray-900 dark:text-white">
          {row.assignments.length} completed
        </div>
      ),
      sortable: false,
    },
    {
      id: 'grade',
      header: 'Grade',
      cell: (row: any) => {
        let color = 'text-green-600 dark:text-green-400';
        
        if (row.finalGrade < 70) {
          color = 'text-red-600 dark:text-red-400';
        } else if (row.finalGrade < 80) {
          color = 'text-amber-600 dark:text-amber-400';
        }
        
        return (
          <div className={`text-center text-lg font-semibold ${color}`}>
            {row.finalGrade}%
          </div>
        );
      },
      sortable: true,
    },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Grades</h1>
        <div className="mt-4 flex gap-3 sm:mt-0">
          <Button size="sm" variant="ghost" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Average Course Grades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Student Grades
            </h2>
            
            <div className="flex items-center">
              <label htmlFor="course-filter" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by Course:
              </label>
              <select
                id="course-filter"
                className="select max-w-xs"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <DataTable
          data={gradeData}
          columns={columns}
          searchable
          searchPlaceholder="Search by student or course..."
        />
        
        <div className="border-t border-gray-200 p-4 text-right dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {gradeData.length} of {gradeData.length} grade records
          </p>
        </div>
      </div>
    </div>
  );
};

export default Grades;