// src/components/formSteps/UploadAttachmentsForm.jsx
import React, { useState, useRef } from 'react';
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";

// Helper: Format file size to human-readable (KB, MB, etc.)
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Allowed MIME types and extensions
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
];

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];

const UploadAttachmentsForm = ({ attachments, setAttachments, error }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Validate file type by MIME type or extension
  const isValidFileType = (file) => {
    const mimeTypeValid = ALLOWED_TYPES.includes(file.type);
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const extensionValid = ALLOWED_EXTENSIONS.includes(extension);
    return mimeTypeValid || extensionValid;
  };

  const handleAddFile = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check for invalid file types
    const invalidFiles = selectedFiles.filter(file => !isValidFileType(file));
    if (invalidFiles.length > 0) {
      setErrorMsg('Only PDF, DOC, DOCX, XLS, and XLSX files are allowed.');
      e.target.value = ''; // reset input
      return;
    }

    // Check file count limit
    if (attachments.length + selectedFiles.length > 2) {
      setErrorMsg('You can only upload up to 2 files.');
      e.target.value = '';
      return;
    }

    setErrorMsg('');
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
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current && attachments.length < 2) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <div className="!bg-gradient-to-r from-[#2b4d8a] via-[#3e6ab3] to-[#2b4d8a] px-4 py-1 border-b-4 border-blue-500 rounded-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-blue-500 flex items-center justify-center shadow">
            <span className="text-white font-bold text-base">4</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white ">
              Upload Attachments
            </h2>
          </div>
        </div>
      </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input type="text" placeholder="Choose files..." value="" readOnly className="flex-grow" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAddFile}
              multiple
              className="hidden"
              disabled={attachments.length >= 2}
              // Optional: hint to browser about allowed types
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBrowseClick}
              disabled={attachments.length >= 2}
              className={`${attachments.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Browse...
            </Button>
          </div>

          {/* Max file or type error */}
          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          {/* Validation error */}
          {error && (
            <div className="text-red-600 text-sm font-medium flex items-center p-2 bg-red-50 border border-red-200 rounded-md">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* File List */}
          {attachments.length > 0 && (
            <div className="border rounded-md p-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-indigo-700 mb-2">
                Selected Files ({attachments.length}/2)
              </h3>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase">
                    <th className="pb-2">File Name</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Size</th> {/* Removed "(KB)" */}
                    <th className="pb-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attachments.map((file, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 font-medium text-gray-900">{file.fileName}</td>
                      <td className="py-2 text-gray-700">{file.fileType || 'Unknown'}</td>
                      <td className="py-2 text-gray-700">{formatFileSize(file.fileSize)}</td> {/* ✅ Human-readable */}
                      <td className="py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 p-0 h-auto"
                          onClick={() => handleDelete(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v2M4 7h16"/>
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-sm text-gray-500">
            You can upload up to 2 files. Supported formats: PDF, DOCX, XLSX.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadAttachmentsForm;