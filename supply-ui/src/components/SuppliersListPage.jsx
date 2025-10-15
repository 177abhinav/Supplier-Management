 //src/components/SuppliersListPage.jsx
import React, { useState, useEffect } from "react";
import SupplierDetailModal from "./SupplierDetailModal";
import { useNavigate } from "react-router-dom";

const SuppliersListPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    city: "",
    status: "",
  });

  // Fetch suppliers or fallback to dummy data
  useEffect(() => {
    setLoading(true); 
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/suppliers");
        if (!response.ok) throw new Error("Failed to fetch suppliers");
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        console.warn("Using dummy suppliers due to error:", err.message);
        const dummySuppliers = [
          {
            ID: 1,
            supplierName: "Acme Corporation",
            status: "Active",
            mainAddress: { city: "New York", country: "USA" },
            primaryContact: { firstName: "John", lastName: "Doe", email: "john.doe@acme.com" },
          },
          {
            ID: 2,
            supplierName: "Globex Inc.",
            status: "Pending",
            mainAddress: { city: "Los Angeles", country: "USA" },
            primaryContact: { firstName: "Jane", lastName: "Smith", email: "jane.smith@globex.com" },
          },
          {
            ID: 3,
            supplierName: "Stark Industries",
            status: "Active",
            mainAddress: { city: "Malibu", country: "USA" },
            primaryContact: { firstName: "Tony", lastName: "Stark", email: "tony@starkindustries.com" },
          },
          {
            ID: 4,
            supplierName: "Wayne Enterprises",
            status: "Rejected",
            mainAddress: { city: "Gotham", country: "USA" },
            primaryContact: { firstName: "Bruce", lastName: "Wayne", email: "bruce@wayneenterprises.com" },
          },
        ];
        setSuppliers(dummySuppliers);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesName = supplier.supplierName.toLowerCase().includes(filters.name.toLowerCase());
    const matchesCity = (supplier.mainAddress?.city || "").toLowerCase().includes(filters.city.toLowerCase());
    const matchesStatus = (supplier.status || "").toLowerCase().includes(filters.status.toLowerCase());
    return matchesName && matchesCity && matchesStatus;
  });

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleClearFilters = () =>
    setFilters({ name: "", city: "", status: "" });

  const openModal = (id) => setSelectedSupplierId(id);
  const closeModal = () => setSelectedSupplierId(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

 if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading suppliers...</p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100 pt-0">
      <div className="container mx-auto px-4">
       
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="px-4 py-2 bg-[#1a365d] hover:bg-[#152c4a] text-white text-sm font-medium rounded-xl flex items-center transition-colors duration-200 shadow-md"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        
        <div className="
          !bg-gradient-to-r from-[#2b4d8a] via-[#3e6ab3] to-[#2b4d8a]
          px-6 py-2
          border-b-4 border-blue-500
          rounded-lg
          mb-6
          shadow-sm
        ">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Suppliers
              </h1>
            </div>
          </div>
        </div>

        
        <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200 p-3 mb-5">
          <div className="flex flex-wrap items-end gap-5">
          
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-[#1a365d] mb-2">Supplier Name</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#1a365d]/30 focus:border-[#1a365d] bg-white"
              />
            </div>

      
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-[#1a365d] mb-2">City</label>
              <input
                type="text"
                placeholder="Search by city..."
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#1a365d]/30 focus:border-[#1a365d] bg-white"
              />
            </div>

            
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-[#1a365d] mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#1a365d]/30 focus:border-[#1a365d] bg-white"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="shrink-0">
              <button
                onClick={handleClearFilters}
                className="px-5 py-3 bg-[#1a365d] hover:bg-[#152c4a] text-white text-sm font-medium rounded-xl flex items-center transition-colors duration-200 shadow-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        
        <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200 overflow-hidden">
          {filteredSuppliers.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-semibold text-gray-700">No suppliers found</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className=" !bg-gradient-to-r from-[#2b4d8a] via-[#3e6ab3] to-[#2b4d8a]">
                  <tr>
                    {["Supplier Name", "Contact", "Email", "City", "Status", "Actions"].map((header, idx) => (
                      <th key={idx} className="px-8 py-2.5 text-left text-sm font-bold text-white uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSuppliers.map((s, idx) => (
                    <tr key={idx} className="group hover:bg-gray-50 transition-all duration-200 cursor-pointer" onClick={() => openModal(s.ID)}>
                      <td className="px-8 py-6 font-semibold text-gray-900 group-hover:text-[#1a365d]">{s.supplierName}</td>
                      <td className="px-8 py-6 text-sm text-gray-700">{`${s.primaryContact?.firstName || ""} ${s.primaryContact?.lastName || ""}`.trim() || "—"}</td>
                      <td className="px-8 py-6 text-sm text-blue-600 hover:text-blue-800">{s.primaryContact?.email || "—"}</td>
                      <td className="px-8 py-6 text-sm text-gray-600">{s.mainAddress?.city || "—"}</td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${s.status === "Active" ? "bg-green-100 text-green-800" : s.status === "Pending" ? "bg-yellow-100 text-yellow-800" : s.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}`}>{s.status || "Unknown"}</span>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={(e) => { e.stopPropagation(); openModal(s.ID); }}
                          className="px-4 py-2 bg-[#1a365d] text-white text-sm font-medium rounded-lg hover:bg-[#152c4a] transform hover:scale-105 transition-all duration-200 shadow-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedSupplierId && <SupplierDetailModal supplierId={selectedSupplierId} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default SuppliersListPage; 