import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailModal from './UserDetailModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/all-users`);
        setUsers(response.data || []);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${userId}`, { status: newStatus });
      setUsers(users.map(user => (user._id === userId ? { ...user, status: newStatus } : user)));
    } catch (err) {
      console.error('Failed to change status', err);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-auto   border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map(user => (
              <tr key={user._id} className={`border-b hover:bg-gray-100 ${user.admin ? 'bg-gray-300' : ''}`}>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phoneNumber}</td>
                <td className="py-3 px-4">
                  <span className={`py-1 px-2 rounded-full text-xs ${user.status === 'active' ? 'bg-green-200' : user.status === 'inactive' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                    {user.status}
                  </span>
                </td>
                {user.admin ? (
                  <td className="py-3 px-4 flex items-center">Admin</td>
                ) : (
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => {
                        if (user.status === 'pending') {
                          handleStatusChange(user._id, 'active');
                        } else if (user.status === 'active') {
                          handleStatusChange(user._id, 'inactive');
                        } else if (user.status === 'inactive') {
                          handleStatusChange(user._id, 'active');
                        }
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-1 px-3 rounded transition duration-200"
                    >
                      {user.status === 'pending' ? 'Approve' : user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleViewUser(user)}
                      className="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-3 rounded transition duration-200"
                    >
                      View
                    </button>
                  </td>

                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {isModalOpen && <UserDetailModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default Users;
