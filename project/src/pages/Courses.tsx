import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookPlus, DownloadCloud } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { courses } from '../data/mockData';

const Courses = () => {
  const navigate = useNavigate();

  const columns = [
    {
      id: 'name',
      header: 'Course',
      cell: (course: any) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{course.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{course.code}</div>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'instructor',
      header: 'Instructor',
      cell: (course: any) => course.instructor,
      sortable: true,
    },
    {
      id: 'grade',
      header: 'Grade',
      cell: (course: any) => course.grade,
      sortable: true,
    },
    {
      id: 'schedule',
      header: 'Schedule',
      cell: (course: any) => (
        <div>
          <div className="text-sm">{course.schedule}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{course.room}</div>
        </div>
      ),
      sortable: false,
    },
    {
      id: 'enrollment',
      header: 'Enrollment',
      cell: (course: any) => (
        <div className="flex items-center">
          <div className="mr-2 h-2 w-full max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${(course.enrolledStudents / course.maxCapacity) * 100}%` }}
            ></div>
          </div>
          <span>{course.enrolledStudents}/{course.maxCapacity}</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (course: any) => {
        let variant: 'blue' | 'green' | 'yellow' | 'red' | 'gray' = 'gray';
        
        switch (course.status) {
          case 'Active':
            variant = 'green';
            break;
          case 'Pending':
            variant = 'yellow';
            break;
          case 'Completed':
            variant = 'blue';
            break;
          case 'Cancelled':
            variant = 'red';
            break;
        }
        
        return <Badge variant={variant}>{course.status}</Badge>;
      },
      sortable: true,
    },
  ];

  const handleViewCourse = (course: any) => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Courses</h1>
        <div className="mt-4 flex gap-3 sm:mt-0">
          <Button size="sm" variant="ghost" className="gap-2">
            <DownloadCloud className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="primary" className="gap-2">
            <BookPlus className="h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <DataTable
          data={courses}
          columns={columns}
          searchable
          searchPlaceholder="Search courses by name, code, or instructor..."
          onRowClick={handleViewCourse}
        />
        
        <div className="border-t border-gray-200 p-4 text-right dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {courses.length} of {courses.length} courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;