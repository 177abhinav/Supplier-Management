// src/components/formSteps/UploadAttachmentsForm.jsx
import React, { useState, useRef } from 'react';
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const UploadAttachmentsForm = ({ attachments, setAttachments, error }) => {
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
        <h2 className="text-2xl font-bold text-[#1a365d] tracking-tight">
          4. Upload Attachments
        </h2>
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

          {/* Max file error */}
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
                    <th className="pb-2">Size (KB)</th>
                    <th className="pb-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attachments.map((file, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 font-medium text-gray-900">{file.fileName}</td>
                      <td className="py-2 text-gray-700">{file.fileType || 'Unknown'}</td>
                      <td className="py-2 text-gray-700">{(file.fileSize / 1024).toFixed(2)}</td>
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
