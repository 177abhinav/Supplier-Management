// src/components/SuppliersListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuppliersListPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    name: '',
    city: '',
    status: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/suppliers');
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesName = supplier.supplierName.toLowerCase().includes(filters.name.toLowerCase());
    const matchesCity = (supplier.city || '').toLowerCase().includes(filters.city.toLowerCase());
    const matchesStatus = (supplier.status || '').toLowerCase().includes(filters.status.toLowerCase());
    return matchesName && matchesCity && matchesStatus;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      city: '',
      status: '',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading suppliers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-400 rounded-xl p-8 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-red-800">Error Loading Suppliers</h3>
              <p className="mt-2 text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* 👉 Hero Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-800">
            Suppliers
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-3"></div>
        </div>

        {/* 👉 Filters Card — Glassmorphism Style */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 mb-10 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Filter Suppliers
          </h3>
          <div className="flex flex-wrap items-end gap-5">
            {/* Supplier Name */}
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                Supplier Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/90 hover:bg-white"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* City */}
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                City
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by city..."
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full pl-4 pr-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-3 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/90 hover:bg-white"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Status */}
            <div className="flex-1 min-w-[240px] group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:ring-3 focus:ring-blue-200 focus:border-blue-500 bg-white/90 hover:bg-white transition-all duration-300 appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="shrink-0">
              <button
                onClick={handleClearFilters}
                className="mt-5 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* 👉 Results */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {filteredSuppliers.length} Supplier{filteredSuppliers.length !== 1 ? 's' : ''} Found
              </h2>
              {Object.values(filters).some(val => val) && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Filters Active
                </span>
              )}
            </div>
          </div>

          {filteredSuppliers.length === 0 ? (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.98-6.123-2.577M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No suppliers found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or clear them to see all suppliers.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Supplier Name</th>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">City</th>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-8 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSuppliers.map((s, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
                      onClick={() => navigate(`/suppliers/${s.id}`)}
                    >
                      <td className="px-8 py-6 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {s.supplierName}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-700">
                        {`${s.firstName || ''} ${s.lastName || ''}`.trim() || '—'}
                      </td>
                      <td className="px-8 py-6 text-sm text-blue-600 hover:text-blue-800 break-all">
                        {s.email || '—'}
                      </td>
                      <td className="px-8 py-6 text-sm text-gray-600">
                        {s.city || '—'}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          s.status === 'Active' ? 'bg-green-100 text-green-800' :
                          s.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          s.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {s.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/suppliers/${s.id}`);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow"
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
      </div>
    </div>
  );
};

export default SuppliersListPage;