import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Toast  } from '@/components/ui/toast';
import { Skeleton } from '@/components/ui/skeleton'; // Optional: Skeleton Loader

interface User {
  name: string;
  age: number;
  dob: string;
  id: string;
}

const DashboardTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { name: 'John Doe', age: 28, dob: '1997-05-21', id: '1' },
        { name: 'Jane Smith', age: 34, dob: '1991-08-11', id: '2' },
        { name: 'Alice Johnson', age: 24, dob: '2000-12-05', id: '3' },
        // More mock data
      ]);
      setLoading(false);
    }, 2000); // Simulating a network request
  }, []);

  const handleAdd = () => {
    Toast.success('User added successfully!');
    // Add user logic here
  };

  const handleEdit = (id: string) => {
    Toast.info('User edited successfully!');
    // Edit user logic here
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    Toast.error('User deleted successfully!');
  };

  // Skeleton Loader for loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-[300px] h-[40px] rounded-full"/>
        <Skeleton className="w-[300px] h-[40px] rounded-full" />
        <Skeleton className="w-[300px] h-[40px] rounded-full"/>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <button
        onClick={handleAdd}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New User
      </button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="text-left">Name</TableCell>
              <TableCell className="text-left">Age</TableCell>
              <TableCell className="text-left">Date of Birth</TableCell>
              <TableCell className="text-left">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell className="space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
};

export default DashboardTable;
