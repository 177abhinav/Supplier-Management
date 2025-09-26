// src/components/common/Header.jsx
import React from 'react';

const Header = ({ onShowApprovers, onDownloadExcel, onShowSuppliers }) => {
  return (
    <header className="bg-blue-200 py-6 px-8 shadow-md flex items-center justify-between" style={{ minHeight: '80px' }}>
      <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
      <div className="flex space-x-2">
        <button
          onClick={onDownloadExcel}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
        >
          Download Excel
        </button>
        <button
          onClick={onShowApprovers}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
        >
          Show Approvers
        </button>
        <button
          onClick={onShowSuppliers} 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
        >
          Show Suppliers
        </button>
      </div>
    </header>
  );
};

export default Header;