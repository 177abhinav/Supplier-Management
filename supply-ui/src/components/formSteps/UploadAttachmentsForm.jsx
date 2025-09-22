// src/components/formSteps/UploadAttachmentsForm.jsx
import React, { useState, useRef } from 'react';

const UploadAttachmentsForm = ({ attachments, setAttachments, onNext, onBack }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleAddFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (attachments.length + selectedFiles.length > 2) {
      setErrorMsg('You can only upload up to 2 files.');
      e.target.value = '';
      return;
    }
    setErrorMsg('');
    const newFiles = selectedFiles.map(file => ({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    }));
    setAttachments([...attachments, ...newFiles]);
    e.target.value = ''; // Reset input so change event fires again if same file reselected
  };

  const handleDelete = (index) => {
    const updatedFiles = attachments.filter((_, i) => i !== index);
    setAttachments(updatedFiles);
    setErrorMsg('');
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current && attachments.length < 2) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">4. Upload Attachments</h2>
      <div className="flex items-center space-x-2">
        {/* ✅ Text field always shows "Choose files..." — never changes */}
        <input
          type="text"
          placeholder="Choose files..."
          value="" // ← Always empty — never shows "1 file(s) selected"
          readOnly
          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        
        {/* ✅ Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAddFile}
          multiple
          className="hidden"
          disabled={attachments.length >= 2}
        />
        
        {/* ✅ Browse button — ONLY this triggers file dialog */}
        <button
          type="button"
          onClick={handleBrowseClick}
          disabled={attachments.length >= 2}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            attachments.length >= 2
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
          }`}
        >
          Browse...
        </button>

        {/* ✅ Add Files button — NO LONGER triggers file dialog */}
        <button
          type="button"
          onClick={onNext} // ← Just go to next step, or show message — doesn't open file picker
          disabled={attachments.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow ${
            attachments.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Add Files
        </button>
      </div>

      {errorMsg && (
        <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
      )}

      {attachments.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected Files ({attachments.length}/2)</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">File Name</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Size (KB)</th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attachments.map((file, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{file.fileName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{file.fileType || 'Unknown'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{(file.fileSize / 1024).toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      aria-label="Remove file"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">
        You can upload up to 2 files. Supported formats: PDF, DOCX, XLSX.
      </p>

      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadAttachmentsForm;