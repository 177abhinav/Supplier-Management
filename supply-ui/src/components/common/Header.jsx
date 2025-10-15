// src/components/common/Header.jsx
import React from "react";
import { FileDown, Users, Building2 } from "lucide-react";

const Header = ({ onShowApprovers, onDownloadExcel, onShowSuppliers }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-100 shadow-md border-b-4 border-blue-500">
      {/* Full width container */}
      <div className="px-5 md:px-8 py-3"> {/* Increased py-4 → py-6 for more height */}
        <div className="flex items-center justify-between">
          {/* Title with underline accent */}
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a365d] tracking-tight relative inline-block">
              Supplier Management
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
          
           

            <button
              onClick={onShowApprovers}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
                text-white bg-[#1a365d] hover:bg-[#162a4b] 
                rounded-lg shadow-md border-b-4 border-blue-500 transition-all duration-200
                focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
            >
              <Users className="w-4 h-4" />
              Show Approvers
            </button>

            <button
              onClick={onShowSuppliers}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium 
                text-white bg-[#1a365d] hover:bg-[#162a4b] 
                rounded-lg shadow-md border-b-4 border-blue-500 transition-all duration-200
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