import React from 'react';

const ReviewAndSubmitForm = ({ formData, onBack, onSubmit }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Review & Submit</h2>
      <div className="space-y-2">
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Supplier Details
          </h3>
          <div className="mt-2 text-gray-700 grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex justify-between"><span className="font-medium">Supplier Name:</span> <span>{formData.supplierName}</span></div>
            <div className="flex justify-between"><span className="font-medium">Street:</span> <span>{formData.street}</span></div>
            <div className="flex justify-between"><span className="font-medium">Line2:</span> <span>{formData.line2}</span></div>
            <div className="flex justify-between"><span className="font-medium">Line3:</span> <span>{formData.line3}</span></div>
            <div className="flex justify-between"><span className="font-medium">City:</span> <span>{formData.city}</span></div>
            <div className="flex justify-between"><span className="font-medium">PostalCode:</span> <span>{formData.postalCode}</span></div>
            <div className="flex justify-between"><span className="font-medium">Country:</span> <span>{formData.country}</span></div>
            <div className="flex justify-between"><span className="font-medium">Region:</span> <span>{formData.region}</span></div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Contact Details
          </h3>
          <div className="mt-2 space-y-2 text-gray-700">
            <p className="flex justify-between"><span className="font-medium">First Name:</span> <span>{formData.firstName}</span></p>
            <p className="flex justify-between"><span className="font-medium">Last Name:</span> <span>{formData.lastName}</span></p>
            <p className="flex justify-between"><span className="font-medium">Email:</span> <span>{formData.email}</span></p>
            <p className="flex justify-between"><span className="font-medium">Phone:</span> <span>{formData.phone}</span></p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-md p-4 border border-gray-200">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Uploaded Attachments
          </h3>
          <div className="mt-2 space-y-2 text-gray-700">
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
        <div className="flex space-x-4">
          <button onClick={onBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow">
            Back
          </button>
          <button onClick={onSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmitForm;
