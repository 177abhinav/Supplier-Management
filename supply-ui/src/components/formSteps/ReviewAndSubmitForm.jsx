// src/components/formSteps/ReviewAndSubmitForm.jsx
import React from 'react';
import StepNavigator from '../common/StepNavigator';

const ReviewAndSubmitForm = ({ formData, onBack, onSubmit, goToStep }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Review & Submit</h2>
      <div className="space-y-2">
        
        {/* Supplier Details */}
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Supplier Details
          </h3>
          <div className="mt-2 text-gray-700 grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex"><span className="font-medium w-40">Supplier Name:</span><span>{formData.supplierName}</span></div>
            <div className="flex"><span className="font-medium w-40">Street:</span><span>{formData.mainAddress.street}</span></div>
            <div className="flex"><span className="font-medium w-40">Line2:</span><span>{formData.mainAddress.line2}</span></div>
            <div className="flex"><span className="font-medium w-40">Line3:</span><span>{formData.mainAddress.line3}</span></div>
            <div className="flex"><span className="font-medium w-40">City:</span><span>{formData.mainAddress.city}</span></div>
            <div className="flex"><span className="font-medium w-40">Postal Code:</span><span>{formData.mainAddress.postalCode}</span></div>
            <div className="flex"><span className="font-medium w-40">Country:</span><span>{formData.mainAddress.country}</span></div>
            <div className="flex"><span className="font-medium w-40">Region:</span><span>{formData.mainAddress.region}</span></div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Contact Details
          </h3>
          <div className="mt-2 text-gray-700 grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex"><span className="font-medium w-40">First Name:</span><span>{formData.primaryContact.firstName}</span></div>
            <div className="flex"><span className="font-medium w-40">Last Name:</span><span>{formData.primaryContact.lastName}</span></div>
            <div className="flex"><span className="font-medium w-40">Email:</span><span>{formData.primaryContact.email}</span></div>
            <div className="flex"><span className="font-medium w-40">Phone:</span><span>{formData.primaryContact.phone}</span></div>
          </div>
        </div>

        {/* Category & Region */}
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Category & Region
          </h3>
          <div className="mt-2 text-gray-700 grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex"><span className="font-medium w-40">Category:</span><span>{formData.categoryAndRegion.category}</span></div>
            <div className="flex"><span className="font-medium w-40">Region:</span><span>{formData.categoryAndRegion.region}</span></div>
          </div>
        </div>

        {/* Additional Info */}
        {formData.additionalInfo.details && (
          <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Additional Information
            </h3>
            <div className="mt-2 text-gray-700">
              <p>{formData.additionalInfo.details}</p>
            </div>
          </div>
        )}

        {/* Uploaded Attachments */}
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Uploaded Attachments
          </h3>
          <div className="mt-2 text-gray-700">
            {formData.attachments && formData.attachments.length > 0 ? (
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (KB)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.attachments.map((file, idx) => (
                    <tr key={idx} className="hover:bg-blue-100">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-900 font-medium">{file.fileName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-700">{file.fileType}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-700">{(file.fileSize / 1024).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className="text-gray-500">No files uploaded.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmitForm;