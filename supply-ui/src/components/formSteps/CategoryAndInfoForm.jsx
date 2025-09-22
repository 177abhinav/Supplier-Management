import React from 'react';

const CategoryAndInfoForm = ({ formData, handleChange, formErrors, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">3. Category and Additional Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className={`block text-sm font-medium ${formErrors.category ? 'text-red-500' : 'text-gray-700'}`}>Category:<span className="text-red-500">*</span></label>
          <input type="text" name="category" value={formData.category || ''} onChange={handleChange} className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`} />
          {formErrors.category && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{formErrors.category}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Region:</label>
          <input type="text" name="infoRegion" value={formData.infoRegion || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Additional Info:</label>
          <textarea name="additionalInfo" value={formData.additionalInfo || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" rows="4"></textarea>
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button onClick={onBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow">
          Back
        </button>
        <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow">
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryAndInfoForm;