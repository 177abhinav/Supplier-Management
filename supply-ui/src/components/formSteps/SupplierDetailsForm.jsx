// src/components/formSteps/SupplierDetailsForm.jsx
import React from 'react';
import StepNavigator from '../common/StepNavigator';

const SupplierDetailsForm = ({ formData, handleChange, handleAddressChange, formErrors, onNext, goToStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Supplier Details</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className={`block text-sm font-medium ${formErrors.supplierName ? 'text-red-500' : 'text-gray-700'}`}>
            Supplier Name:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.supplierName || ''}
            onChange={(e) => handleChange('supplierName', e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.supplierName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.supplierName && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formErrors.supplierName}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Partner ID:</label>
          <input
            type="text"
            value={formData.businessPartnerId || ''}
            onChange={(e) => handleChange('businessPartnerId', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street:</label>
          <input
            type="text"
            value={formData.mainAddress.street || ''}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Line2:</label>
          <input
            type="text"
            value={formData.mainAddress.line2 || ''}
            onChange={(e) => handleAddressChange('line2', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Line3:</label>
          <input
            type="text"
            value={formData.mainAddress.line3 || ''}
            onChange={(e) => handleAddressChange('line3', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City:</label>
          <input
            type="text"
            value={formData.mainAddress.city || ''}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code:</label>
          <input
            type="text"
            value={formData.mainAddress.postalCode || ''}
            onChange={(e) => handleAddressChange('postalCode', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${formErrors.country ? 'text-red-500' : 'text-gray-700'}`}>
            Country:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.mainAddress.country || ''}
            onChange={(e) => handleAddressChange('country', e.target.value)}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.country ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.country && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formErrors.country}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Region:</label>
          <input
            type="text"
            value={formData.mainAddress.region || ''}
            onChange={(e) => handleAddressChange('region', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            value={formData.status || 'Pending'}
            onChange={(e) => handleChange('status', e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsForm;