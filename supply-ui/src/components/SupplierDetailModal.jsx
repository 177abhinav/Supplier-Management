// src/components/SupplierDetailModal.jsx
import React, { useEffect, useState } from "react";

const SupplierDetailModal = ({ supplierId, onClose }) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(`/api/suppliers/${supplierId}`);
        if (!res.ok) throw new Error("Failed to fetch supplier details");
        const data = await res.json();
        setSupplier(data);
      } catch (err) {
        setSupplier({
          supplierName: "Demo Supplier",
          status: "Active",
          businessPartnerId: "BP-12345",
          mainAddress: {
            country: "India",
            city: "Hyderabad",
            region: "Telangana",
            street: "Demo Street",
            postalCode: "500081"
          },
          primaryContact: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+91 9876543210"
          },
          categoryAndRegion: {
            category: "Electronics",
            region: "South"
          },
          additionalInfo: {
            details: "This is a dummy additional information."
          },
          attachments: [
            {
              fileName: "demo_file_1.pdf",
              mimeType: "application/pdf",
              fileSize: 204800
            },
            {
              fileName: "demo_file_2.jpg",
              mimeType: "image/jpeg",
              fileSize: 102400
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center border border-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading supplier details...</p>
        </div>
      </div>
    );

  if (!supplier) return null;

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-1">
      <span className="font-medium text-gray-600 w-48">{label}</span>
      <span className="text-gray-900 flex-1 break-words">{value || "—"}</span>
    </div>
  );

  const cardStyle = "w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md rounded-xl border border-gray-200 p-4 mb-4";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
        
        {/* ✨ Gradient Header (Matching Form Steps) ✨ */}
        <div className="
          !bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#1e293b]
          px-6 py-5
          border-b-4 border-blue-500
          rounded-t-2xl
        ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Supplier Details
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 text-2xl font-bold transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier Information */}
            <div className={cardStyle}>
              <h3 className="text-lg font-semibold text-[#1a365d] mb-3 pb-2 border-b border-gray-200">
                Supplier Information
              </h3>
              <InfoRow label="Supplier Name:" value={supplier.supplierName} />
              <InfoRow label="Status:" value={supplier.status} />
              <InfoRow label="Business Partner ID:" value={supplier.businessPartnerId} />
              <InfoRow label="Country:" value={supplier.mainAddress?.country} />
              <InfoRow label="City:" value={supplier.mainAddress?.city} />
              <InfoRow label="Region:" value={supplier.mainAddress?.region} />
              <InfoRow label="Street:" value={supplier.mainAddress?.street} />
              <InfoRow label="Postal Code:" value={supplier.mainAddress?.postalCode} />
            </div>

            {/* Contact & Category Information */}
            <div className={cardStyle}>
              <h3 className="text-lg font-semibold text-[#1a365d] mb-3 pb-2 border-b border-gray-200">
                Contact & Category
              </h3>
              <InfoRow label="First Name:" value={supplier.primaryContact?.firstName} />
              <InfoRow label="Last Name:" value={supplier.primaryContact?.lastName} />
              <InfoRow label="Email:" value={supplier.primaryContact?.email} />
              <InfoRow label="Phone:" value={supplier.primaryContact?.phone} />
              <InfoRow label="Category:" value={supplier.categoryAndRegion?.category} />
              <InfoRow label="Region:" value={supplier.categoryAndRegion?.region} />
            </div>
          </div>

          {/* Additional Information */}
          <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-[#1a365d] mb-3 pb-2 border-b border-gray-200">
              Additional Information
            </h3>
            <p className="text-gray-900 whitespace-pre-wrap">
              {supplier.additionalInfo?.details || "N/A"}
            </p>
          </div>

          {/* Attachments */}
          {supplier.attachments?.length > 0 && (
            <div className={cardStyle}>
              <h3 className="text-lg font-semibold text-[#1a365d] mb-3 pb-2 border-b border-gray-200">
                Attachments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                      <th className="px-4 py-2 font-semibold">File Name</th>
                      <th className="px-4 py-2 font-semibold">Type</th>
                      <th className="px-4 py-2 font-semibold">Size (KB)</th>
                      <th className="px-4 py-2 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {supplier.attachments.map((file, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 break-all">{file.fileName}</td>
                        <td className="px-4 py-3">{file.mimeType}</td>
                        <td className="px-4 py-3">{(file.fileSize / 1024).toFixed(1)}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`/api/suppliers/${supplier.ID || supplierId}/attachments/${encodeURIComponent(file.fileName)}`}
                            download={file.fileName}
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailModal;