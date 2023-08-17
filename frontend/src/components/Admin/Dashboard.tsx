import React, { useState, useEffect } from "react";

interface User {
  _id: number;
  name: string;
  email: string;
  role: string;
}

interface DashboardPageProps {
  setRole: (role: string) => void;
}

const AdminDashboard: React.FC<DashboardPageProps> = ({ setRole }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          KeyqorKey: String(sessionStorage.getItem("KeyqorKey")),
        },
      });
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    setRole("");
  };

  const handleDeleteClick = (user: User) => {
    console.log(user._id);
    setUserToDelete(user);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/" + userToDelete._id,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Success");
        } else if (response.status === 400) {
          console.log("User not found");
        }
      } catch (error) {
        console.log("Network error:", error);
      }
    }
    setUserToDelete(null);
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-kpopPink to-kpopPurple">
      <div className="flex items-center justify-center h-16 bg-kpopBlue text-white">
        <h1 className="ml-2 text-2xl">Admin Dashboard</h1>
      </div>
      <div className="flex mt-4">
        <div className="w-1/4 h-1/4 bg-kpopGray p-4 overflow-y-auto border border-black">
          <h2 className="text-lg text-white mb-2">User List</h2>
          <ul className="text-white">
            {users.map((user) => (
              <li key={user._id} className="mb-2">
                <div className="border-b border-black pb-2">
                  <p>id: {user._id}</p>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="px-4 py-2 mt-2 text-sm bg-kpopBlue text-white rounded-md shadow-md hover:bg-kpopYellow"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1"></div>
      </div>
      <button
        onClick={handleLogout}
        className="absolute bottom-4 right-4 px-6 py-3 text-xl bg-kpopBlue text-white rounded-md shadow-md hover:bg-kpopYellow"
      >
        Logout
      </button>
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6">
            <p className="text-lg">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
