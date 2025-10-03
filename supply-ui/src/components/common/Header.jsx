// src/components/common/Header.jsx
import React from "react";
import { FileDown, Users, Building2 } from "lucide-react";

const Header = ({ onShowApprovers, onDownloadExcel, onShowSuppliers }) => {
  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        border border-gray-200 shadow-md rounded-b-xl">
        
        <div className="flex items-center justify-between">
          {/* Title with underline accent */}
          <div>
            <h1 className="text-2xl font-bold text-[#1a365d] tracking-tight relative inline-block">
              Supplier Management
              <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-[#1a365d] rounded-full"></span>
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownloadExcel}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
                text-white bg-[#1a365d] hover:bg-[#162a4b] 
                rounded-lg shadow-md transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
            >
              <FileDown className="w-4 h-4" />
              Download Excel
            </button>

            <button
              onClick={onShowApprovers}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
                text-[#1a365d] bg-white hover:bg-gray-50 border border-gray-200 
                rounded-lg shadow-sm transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
            >
              <Users className="w-4 h-4" />
              Show Approvers
            </button>

            <button
              onClick={onShowSuppliers}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
                text-[#1a365d] bg-white hover:bg-gray-50 border border-gray-200 
                rounded-lg shadow-sm transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
            >
              <Building2 className="w-4 h-4" />
              Show Suppliers
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
