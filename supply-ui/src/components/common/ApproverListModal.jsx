// src/components/common/ApproverListModal.jsx
import React, { useState, useEffect } from "react";

const ApproverListModal = ({ onClose }) => {
  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentApprover, setCurrentApprover] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    level: "1",
    country: "",
  });

  useEffect(() => {
    const fetchApprovers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/approvers");
        if (!response.ok) throw new Error("Failed to fetch approvers");
        const data = await response.json();
        setApprovers(data);
      } catch (err) {
        console.warn("Fetch failed, using dummy data:", err.message);

        const dummyApprovers = [
          { id: 1, name: "Alice Johnson", email: "alice@company.com", level: "1", country: "USA" },
          { id: 2, name: "Bob Smith", email: "bob@company.com", level: "2", country: "UK" },
          { id: 3, name: "Charlie Lee", email: "charlie@company.com", level: "1", country: "Canada" },
        ];
        setApprovers(dummyApprovers);
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? value.toString() : value,
    }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", level: "1", country: "" });
    setCurrentApprover(null);
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/approvers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create approver");
      const newApprover = await response.json();
      setApprovers((prev) => [...prev, newApprover]);
      setIsCreateModalOpen(false);
      resetForm();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleUpdate = async () => {
    if (!currentApprover?.id) return alert("Approver ID is missing!");

    try {
      const response = await fetch(
        `http://localhost:8080/api/approvers/${currentApprover.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update approver");
      const updated = await response.json();
      setApprovers((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const openEditModal = (approver) => {
    setCurrentApprover(approver);
    setFormData({
      name: approver.name,
      email: approver.email,
      level: approver.level.toString(),
      country: approver.country,
    });
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50">
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-xl p-8 w-full max-w-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 mb-4 mx-auto"></div>
          <p className="text-gray-700 font-medium text-lg">Loading approvers...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Approver List Modal */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-auto">
        <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-2xl p-6 w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">
            Approver List
          </h2>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Approvers</h3>
            <button
              onClick={openCreateModal}
              className="bg-[#1a365d] hover:bg-[#153052] text-white px-4 py-2 rounded-xl font-semibold transition-shadow duration-200 shadow-md hover:shadow-lg"
            >
              + Add Approver
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#e0e7ff]">
                <tr>
                  {["Name", "Email", "Level", "Country", "Actions"].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-bold text-[#1a365d] uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {approvers.map((approver) => (
                  <tr
                    key={approver.id}
                    className="hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {approver.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {approver.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {approver.level}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {approver.country}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => openEditModal(approver)}
                        className="text-[#1a365d] hover:text-[#153052] font-semibold transition-colors duration-200"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="text-[#1a365d] font-semibold hover:text-[#153052] transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <ModalForm
          title={isEditModalOpen ? "Edit Approver" : "Create New Approver"}
          formData={formData}
          handleChange={handleChange}
          onCancel={() => {
            isCreateModalOpen
              ? setIsCreateModalOpen(false)
              : setIsEditModalOpen(false);
          }}
          onSubmit={isEditModalOpen ? handleUpdate : handleCreate}
        />
      )}
    </>
  );
};

// Modal Form Component
const ModalForm = ({ title, formData, handleChange, onCancel, onSubmit }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 z-50 overflow-auto">
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-2xl p-6 w-full max-w-md">
      <h3 className="text-xl font-bold text-[#1a365d] mb-6">{title}</h3>
      <div className="space-y-4">
        {["name", "email", "level", "country"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "level" ? "number" : field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              min={field === "level" ? 1 : undefined}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] transition-all duration-300"
              required
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="bg-[#1a365d] hover:bg-[#153052] text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200"
        >
          {title.includes("Edit") ? "Update" : "Create"}
        </button>
      </div>
    </div>
  </div>
);

export default ApproverListModal;
