import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActiveUser = () => {
  const Navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/active/users');
        setActiveUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };

    fetchActiveUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      
      const response = await axios.put(`http://localhost:3000/user/delete/${userId}`);
      setPopupMessage(response.data.msg);
      setPopupType("success");
      setShowPopup(true);

      // Update state to remove deleted user
      setActiveUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setPopupMessage("Failed to delete the user.");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
    setPopupType("");
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Active Users</h1>
      <h1 className="text-center">
        <a
          href="/login"
          className="font-bold text-white bg-red-600 px-2 py-1 ml-4 rounded-sm border border-black"
        >
          Logout
        </a>
      </h1>
      {activeUsers.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-400 mt-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">S no</th>
              <th className="border border-gray-400 px-4 py-2">Full Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Phone Number</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-400 px-4 py-2">{user._id}</td>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{user.Fullname}</td>
                <td className="border border-gray-400 px-4 py-2">{user.Email}</td>
                <td className="border border-gray-400 px-4 py-2">{user.Pnumber}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No active users found.</p>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-md w-[30%] bg-white ${
              popupType === "success" ? "border-green-500" : "border-red-500"
            } border-l-4`}
          >
            <h3
              className={`text-lg font-semibold ${
                popupType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {popupType === "success" ? "Success" : "Error"}
            </h3>
            <p className="mt-2">{popupMessage}</p>
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveUser;
