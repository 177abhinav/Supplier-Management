// src/components/common/ApproverListModal.jsx
import React, { useState, useEffect } from 'react';

const ApproverListModal = ({ onClose }) => {
  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentApprover, setCurrentApprover] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: '1',
    country: ''
  });

  // Fetch approvers on mount
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? value.toString() : value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      level: '1',
      country: ''
    });
    setCurrentApprover(null);
  };

  // Create approver
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

  // Update approver
  const handleUpdate = async () => {
    console.log('Current approver:', currentApprover);
    if (!currentApprover?.id) {
      alert('Approver ID is missing!');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/approvers/${currentApprover.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
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

  // Open create modal
  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (approver) => {
    console.log('Approver data:', approver); // Debug: check what's being passed
    setCurrentApprover(approver);
    setFormData({
      name: approver.name,
      email: approver.email,
      level: approver.level.toString(),
      country: approver.country
    });
    setIsEditModalOpen(true);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Main Approver List Modal */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
        <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-5xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Approver List</h2>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Approvers</h3>
            <button
              onClick={openCreateModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
            >
              Create Approver
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvers.map((approver) => (
                  <tr key={approver.id}>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">{approver.name}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{approver.email}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{approver.level}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">{approver.country}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openEditModal(approver)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
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

      {/* Create Approver Modal */}
      {isCreateModalOpen && (
        <ModalForm
          title="Create New Approver"
          formData={formData}
          handleChange={handleChange}
          onCancel={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {/* Edit Approver Modal */}
      {isEditModalOpen && (
        <ModalForm
          title="Edit Approver"
          formData={formData}
          handleChange={handleChange}
          onCancel={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

// Reusable modal form component
const ModalForm = ({ title, formData, handleChange, onCancel, onSubmit }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {['name', 'email', 'level', 'country'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)} *</label>
            <input
              type={field === 'level' ? 'number' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min={field === 'level' ? 1 : undefined}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-3 justify-end">
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
        >
          {title.includes('Edit') ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  </div>
);

export default ApproverListModal;
