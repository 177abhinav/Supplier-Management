import React from 'react';

const SupplierDetailModalDummy = ({ supplier, onClose }) => {
  if (!supplier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl">&times;</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{supplier.supplierName}</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">ID:</span> {supplier.ID}</p>
          <p><span className="font-semibold">Status:</span> {supplier.status}</p>
          <p><span className="font-semibold">City:</span> {supplier.mainAddress?.city || '-'}</p>
          <p><span className="font-semibold">Country:</span> {supplier.mainAddress?.country || '-'}</p>
          <p><span className="font-semibold">Street:</span> {supplier.mainAddress?.street || '-'}</p>
          <p><span className="font-semibold">Postal Code:</span> {supplier.mainAddress?.postalCode || '-'}</p>
          <p><span className="font-semibold">Primary Contact:</span> {supplier.primaryContact?.firstName} {supplier.primaryContact?.lastName}</p>
          <p><span className="font-semibold">Email:</span> {supplier.primaryContact?.email}</p>
          <p><span className="font-semibold">Phone:</span> {supplier.primaryContact?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailModalDummy;
