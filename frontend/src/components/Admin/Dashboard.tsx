import React, { useState, useEffect } from "react";

interface User {
  _id: number;
  name: string;
  email: string;
  role: string;
}

interface Card {
  _id: string;
  imageUrl: string;
  condition: string;
  group: string;
  member: string;
  album: string;
  version: string;
  description: string;
  user: string;
}

interface DashboardPageProps {
  setRole: (role: string) => void;
}

const AdminDashboard: React.FC<DashboardPageProps> = ({ setRole }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
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

    const fetchCard = async () => {
      const response = await fetch("http://localhost:5000/api/card");
      if (response.status === 200) {
        const data = await response.json();
        setCards(data);
      }
    };

    fetchCard();
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
    <div className="h-screen">
      <div className="flex items-center justify-center h-16 bg-kpopBlue text-white">
        <h1 className="ml-2 text-2xl">Admin Dashboard</h1>
      </div>
      <div></div>
      <div className="flex mt-4 justify-around">
        <div className="h-1/4 p-4 overflow-y-auto text-center">
          <h2 className="text-lg text-black mb-2">User List</h2>
          <table className="border-black border-solid border-2">
            <tr className="border-black border-solid border-2">
              <th className="border-black border-solid border-2">id</th>
              <th className="border-black border-solid border-2">name</th>
              <th className="border-black border-solid border-2">email</th>
              <th className="border-black border-solid border-2">role</th>
              <th className="border-black border-solid border-2">action</th>
            </tr>
            {users.map((user) => (
              <tr className="border-black border-solid border-2">
                <td className="border-black border-solid border-2">
                  {user._id}
                </td>
                <td className="border-black border-solid border-2">
                  {user.name}
                </td>
                <td className="border-black border-solid border-2">
                  {user.email}
                </td>
                <td className="border-black border-solid border-2">
                  {user.role}
                </td>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="m-2 px-4 py-2 mt-2 text-sm bg-black text-white rounded-md shadow-md hover:bg-kpopYellow"
                  hidden={user.role === "Admin"}
                  disabled={user.role === "Admin"}
                >
                  Delete
                </button>
              </tr>
            ))}
          </table>
        </div>
        <div className="h-1/4 p-4 overflow-y-auto text-center">
          <h2 className="text-lg text-black mb-2">Card List</h2>
          <table className="border-black border-solid border-2">
            <tr className="border-black border-solid border-2">
              <th className="border-black border-solid border-2">id</th>
              <th className="border-black border-solid border-2">condition</th>
              <th className="border-black border-solid border-2">group</th>
              <th className="border-black border-solid border-2">member</th>
              <th className="border-black border-solid border-2">album</th>
              <th className="border-black border-solid border-2">version</th>
              <th className="border-black border-solid border-2">user</th>
            </tr>
            {cards.map((card) => (
              <tr className="border-black border-solid border-2">
                <td className="border-black border-solid border-2">
                  {card._id}
                </td>
                <td className="border-black border-solid border-2">
                  {card.condition}
                </td>
                <td className="border-black border-solid border-2">
                  {card.group}
                </td>
                <td className="border-black border-solid border-2">
                  {card.member}
                </td>
                <td className="border-black border-solid border-2">
                  {card.album}
                </td>
                <td className="border-black border-solid border-2">
                  {card.version}
                </td>
                <td className="border-black border-solid border-2">
                  {card.user}
                </td>
              </tr>
            ))}
          </table>
        </div>
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
