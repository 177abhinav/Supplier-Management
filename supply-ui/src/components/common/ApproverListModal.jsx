// src/components/common/ApproverListModal.jsx
import React, { useState, useEffect } from 'react';

const ApproverListModal = ({ onClose }) => {
  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentApprover, setCurrentApprover] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 1,
    country: ''
  });

  // Fetch approvers on load
  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/approvers');
        if (!response.ok) throw new Error('Failed to fetch approvers');
        const data = await response.json();
        setApprovers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovers();
  }, []);

  // Handle Create
  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/approvers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create approver');

      const newApprover = await response.json();
      setApprovers(prev => [...prev, newApprover]);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/approvers/${currentApprover.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update approver');

      const updatedApprover = await response.json();
      setApprovers(prev =>
        prev.map(a => (a.id === updatedApprover.id ? updatedApprover : a))
      );
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (approver) => {
    setCurrentApprover(approver);
    setFormData({
      name: approver.name,
      email: approver.email,
      level: approver.level,
      country: approver.country
    });
    setIsEditModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      level: 1,
      country: ''
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value, 10) : value
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          Loading approvers...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 👉 Main Approver List Modal */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
        <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-5xl"> {/* ✅ Wider modal */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Approver List</h2>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Approvers</h3>
            <div className="space-x-2">
              <button
                onClick={openCreateModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
              >
                Create Approver
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvers.map((approver) => (
                  <tr key={approver.id}>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{approver.name}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[240px]">{approver.email}</td> {/* ✅ Increased padding + min width */}
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{approver.level}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{approver.country}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openEditModal(approver)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mr-2"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* 👉 Create Approver Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Approver</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level *</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3 justify-end">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 👉 Edit Approver Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Approver</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Level *</label>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3 justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproverListModal;