import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { FaPen, FaTrashAlt } from "react-icons/fa"; 
import { Skeleton }from "@/components/ui/skeleton"; 
 
const Dashboard = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null); // track user being edited

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/dashboard");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7000/create", {
        name,
        dob: dob.toISOString().split("T")[0],
      });
      console.log("User created:", response.data);
      toast.success("User added successfully!");
      setName("");
      setDob(null);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to add user");
    }
  };

  const handleEdit = (userId: string) => {
    setEditingUser(userId); // Set the user to edit
  };

  const handleSave = async (userId: string, updatedName: string, updatedDob: Date) => {
    try {
      const response = await axios.put(`http://localhost:7000/edit/${userId}`, {
        name: updatedName,
        dob: updatedDob.toISOString().split("T")[0],
      });
      toast.success("User updated successfully!");
      setUsers(users.map((user) => (user._id === userId ? response.data : user)));
      setEditingUser(null); // Stop editing
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:7000/delete/${userId}`);
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <div className="p-4 max-w-full mx-auto text-orange-500">
      <Toaster />
      <h2 className="text-xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="flex justify-center items-center w-full gap-5">
        <Input
          className="text-xl p-4"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DatePicker
          placeholderText="Enter DOB"
          selected={dob}
          onChange={(date) => setDob(date)}
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="border p-2 rounded-md w-full"
        />
        <Button
          type="submit"
          variant="outline"
          className="text-orange-500 border-orange-400 hover:bg-orange-500 hover:text-white"
        >
          Submit
        </Button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">User Dashboard</h2>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">DOB</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">
                  {editingUser === user._id ? (
                    <Input
                      value={user.name}
                      onChange={(e) => (user.name = e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">
                  {editingUser === user._id ? (
                    <DatePicker
                      selected={new Date(user.dob)}
                      onChange={(date) => (user.dob = date!)}
                      dateFormat="yyyy-MM-dd"
                      className="border p-2 rounded-md"
                    />
                  ) : (
                    new Date(user.dob).toLocaleDateString("en-CA")
                  )}
                </td>
                <td className="border p-2">{calculateAge(user.dob)}</td>
                <td className="border p-2 flex gap-2">
                  {editingUser === user._id ? (
                    <>
                      <Button
                        onClick={() => handleSave(user._id, user.name, user.dob)}
                        className="bg-blue-500 text-white p-2"
                      >
                        Save
                      </Button>
                      <Button onClick={() => setEditingUser(null)} className="bg-gray-500 p-2 text-white">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <FaPen
                        className="cursor-pointer text-2xl ml-2 text-blue-500"
                        onClick={() => handleEdit(user._id)}
                      />
                      <FaTrashAlt
                        className="cursor-pointer text-2xl ml-2 text-red-500"
                        onClick={() => handleDelete(user._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
