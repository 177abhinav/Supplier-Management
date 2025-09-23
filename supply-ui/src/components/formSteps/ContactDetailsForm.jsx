import React from 'react';
import StepNavigator from '../common/StepNavigator';

const ContactDetailsForm = ({ formData, handleChange, formErrors, onNext, onBack, goToStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">2. Contact Details</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className={`block text-sm font-medium ${formErrors.firstName ? 'text-red-500' : 'text-gray-700'}`}>
            First Name:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.firstName && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formErrors.firstName}</span>
            </p>
          )}
        </div>
        <div>
          <label className={`block text-sm font-medium ${formErrors.lastName ? 'text-red-500' : 'text-gray-700'}`}>
            Last Name:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.lastName && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formErrors.lastName}</span>
            </p>
          )}
        </div>
        <div>
          <label className={`block text-sm font-medium ${formErrors.email ? 'text-red-500' : 'text-gray-700'}`}>
            Email:<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500 italic flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{formErrors.email}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* 👇 STEP NAVIGATOR */}
    
    </div>
  );
};

export default ContactDetailsForm;