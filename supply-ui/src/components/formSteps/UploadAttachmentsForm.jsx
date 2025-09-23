import React, { useState, useRef } from 'react';
import StepNavigator from '../common/StepNavigator';

const UploadAttachmentsForm = ({ attachments, setAttachments, onNext, onBack, goToStep, error }) => {
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
    // Clear validation error when files are added
    if (error) {
      // We can't clear parent state directly, but parent should handle it via useEffect or in setAttachments
      // Optional: Add a prop like `onFilesAdded` to clear error — for now, rely on parent validation on Next click
    }
    const newFiles = selectedFiles.map(file => ({
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileUrl: URL.createObjectURL(file),
      rawFile: file
    }));
    setAttachments([...attachments, ...newFiles]);
    e.target.value = '';
  };

  const handleDelete = (index) => {
    const updatedFiles = attachments.filter((_, i) => i !== index);
    setAttachments(updatedFiles);
    setErrorMsg('');
    // Parent should re-validate on next click — no need to clear error here
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
        <input
          type="text"
          placeholder="Choose files..."
          value=""
          readOnly
          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAddFile}
          multiple
          className="hidden"
          disabled={attachments.length >= 2}
        />
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
      </div>

      {/* 👇 Display max file limit error */}
      {errorMsg && <div className="text-red-600 text-sm mb-2">{errorMsg}</div>}

      {/* 👇 Display validation error (from parent) */}
      {error && (
        <div className="text-red-600 text-sm font-medium flex items-center mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {attachments.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Selected Files ({attachments.length}/2)</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                  File Name
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Size (KB)
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Action
                </th>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">You can upload up to 2 files. Supported formats: PDF, DOCX, XLSX.</p>

    </div>
  );
};

export default UploadAttachmentsForm;