import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadCloud, Search, UserPlus } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StudentForm from '../components/students/StudentForm';
import DeleteConfirmation from '../components/students/DeleteConfirmation';
import { students as initialStudents } from '../data/mockData';

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleAddStudent = (data: any) => {
    const newStudent = {
      ...data,
      id: (students.length + 1).toString(),
      courses: [],
      attendance: 100,
      gpa: 0.0,
      status: 'Active',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    };
    setStudents([...students, newStudent]);
    setShowAddForm(false);
  };

  const handleEditStudent = (data: any) => {
    const updatedStudents = students.map((student) =>
      student.id === selectedStudent.id ? { ...student, ...data } : student
    );
    setStudents(updatedStudents);
    setShowEditForm(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = () => {
    const updatedStudents = students.filter(
      (student) => student.id !== selectedStudent.id
    );
    setStudents(updatedStudents);
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
  };

  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: (student: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={student.avatar}
              alt={student.name}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">ID: {student.id}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'grade',
      header: 'Grade',
      cell: (student: any) => (
        <div className="text-center">
          <span className="font-medium">{student.grade}</span>
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({student.section})</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'email',
      header: 'Contact',
      cell: (student: any) => (
        <div>
          <div className="text-sm">{student.email}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{student.phone}</div>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'attendance',
      header: 'Attendance',
      cell: (student: any) => (
        <div className="flex items-center">
          <div className="mr-2 h-2 w-full max-w-[100px] rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${student.attendance}%` }}
            ></div>
          </div>
          <span>{student.attendance}%</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'gpa',
      header: 'GPA',
      cell: (student: any) => (
        <div className="text-center font-medium">
          {student.gpa.toFixed(1)}
        </div>
      ),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (student: any) => {
        let variant: 'blue' | 'green' | 'yellow' | 'red' | 'gray' = 'gray';
        
        switch (student.status) {
          case 'Active':
            variant = 'green';
            break;
          case 'Inactive':
            variant = 'red';
            break;
          case 'Suspended':
            variant = 'yellow';
            break;
          case 'Transferred':
            variant = 'blue';
            break;
        }
        
        return <Badge variant={variant}>{student.status}</Badge>;
      },
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (student: any) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(student);
              setShowEditForm(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(student);
              setShowDeleteConfirm(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleViewStudent = (student: any) => {
    navigate(`/students/${student.id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Students</h1>
        <div className="mt-4 flex gap-3 sm:mt-0">
          <Button size="sm" variant="ghost" className="gap-2">
            <DownloadCloud className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            variant="primary"
            className="gap-2"
            onClick={() => setShowAddForm(true)}
          >
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search students by name, ID, or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <DataTable
          data={students}
          columns={columns}
          onRowClick={handleViewStudent}
        />
        
        <div className="border-t border-gray-200 p-4 text-right dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {students.length} of {students.length} students
          </p>
        </div>
      </div>

      {showAddForm && (
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && selectedStudent && (
        <StudentForm
          onSubmit={handleEditStudent}
          onCancel={() => {
            setShowEditForm(false);
            setSelectedStudent(null);
          }}
          initialData={selectedStudent}
          isEdit
        />
      )}

      {showDeleteConfirm && selectedStudent && (
        <DeleteConfirmation
          title="Delete Student"
          message={`Are you sure you want to delete ${selectedStudent.name}? This action cannot be undone.`}
          onConfirm={handleDeleteStudent}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};

export default Students;