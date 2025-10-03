// src/components/formSteps/ReviewAndSubmitForm.jsx
import React from 'react';
import { Card, CardHeader, CardContent } from "../ui/card";

const ReviewAndSubmitForm = ({ formData }) => {
  return (
    <Card className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <h2 className="text-2xl font-bold text-[#1a365d] tracking-tight">
          5. Review & Submit
        </h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* Supplier Details */}
            <Card className="border border-gray-200 shadow-sm rounded-lg">
              <CardHeader className="p-3 pb-0">
                <h3 className="text-lg font-semibold text-[#1a365d]">Supplier Details</h3>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
                  <div className="flex"><dt className="font-medium w-36">Supplier Name:</dt><dd>{formData.supplierName || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Street:</dt><dd>{formData.mainAddress.street || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Line 2:</dt><dd>{formData.mainAddress.line2 || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Line 3:</dt><dd>{formData.mainAddress.line3 || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">City:</dt><dd>{formData.mainAddress.city || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Postal Code:</dt><dd>{formData.mainAddress.postalCode || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Country:</dt><dd>{formData.mainAddress.country || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Region:</dt><dd>{formData.mainAddress.region || '—'}</dd></div>
                </dl>
              </CardContent>
            </Card>

            {/* Category & Region */}
            <Card className="border border-gray-200 shadow-sm rounded-lg">
              <CardHeader className="p-3 pb-0">
                <h3 className="text-lg font-semibold text-[#1a365d]">Category & Region</h3>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
                  <div className="flex"><dt className="font-medium w-36">Category:</dt><dd>{formData.categoryAndRegion.category || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Region:</dt><dd>{formData.categoryAndRegion.region || '—'}</dd></div>
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Contact Details */}
            <Card className="border border-gray-200 shadow-sm rounded-lg">
              <CardHeader className="p-3 pb-0">
                <h3 className="text-lg font-semibold text-[#1a365d]">Contact Details</h3>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
                  <div className="flex"><dt className="font-medium w-36">First Name:</dt><dd>{formData.primaryContact.firstName || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Last Name:</dt><dd>{formData.primaryContact.lastName || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Email:</dt><dd>{formData.primaryContact.email || '—'}</dd></div>
                  <div className="flex"><dt className="font-medium w-36">Phone:</dt><dd>{formData.primaryContact.phone || '—'}</dd></div>
                </dl>
              </CardContent>
            </Card>

            {/* Additional Info */}
            {formData.additionalInfo.details && (
              <Card className="border border-gray-200 shadow-sm rounded-lg">
                <CardHeader className="p-3 pb-0">
                  <h3 className="text-lg font-semibold text-[#1a365d]">Additional Info</h3>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="text-sm text-gray-700">{formData.additionalInfo.details}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Attachments (full width) */}
        <div className="mt-6">
          <Card className="border border-gray-200 shadow-sm rounded-lg">
            <CardHeader className="p-3 pb-0">
              <h3 className="text-lg font-semibold text-[#1a365d]">Uploaded Attachments</h3>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              {formData.attachments && formData.attachments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 uppercase bg-gray-50">
                        <th className="px-3 py-2">File Name</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Size (KB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {formData.attachments.map((file, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-900">{file.fileName}</td>
                          <td className="px-3 py-2 text-gray-700">{file.fileType || 'Unknown'}</td>
                          <td className="px-3 py-2 text-gray-700">{(file.fileSize / 1024).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No files uploaded.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewAndSubmitForm;
