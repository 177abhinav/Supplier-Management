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
        // Dummy fallback data
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

  if (loading) return <div>Loading...</div>;
  if (!supplier) return null;

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-1">
      <span className="font-medium text-gray-600 w-40">{label}</span>
      <span className="text-gray-900 flex-1">{value || "—"}</span>
    </div>
  );

  const cardStyle = "border rounded-lg p-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-md mb-4";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="w-full max-w-[900px] max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Supplier Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✖
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Supplier Information */}
          <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
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

          {/* Contact Information */}
          <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Contact Information
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
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Additional Information
          </h3>
          <p className="text-gray-900">{supplier.additionalInfo?.details || "N/A"}</p>
        </div>

        {/* Attachments */}
        {supplier.attachments?.length > 0 && (
          <div className={cardStyle}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Attachments
            </h3>
            <table className="w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2 text-left">File Name</th>
                  <th className="border px-3 py-2 text-left">Type</th>
                  <th className="border px-3 py-2 text-left">Size (KB)</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {supplier.attachments.map((file, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border px-3 py-2">{file.fileName}</td>
                    <td className="border px-3 py-2">{file.mimeType}</td>
                    <td className="border px-3 py-2">
                      {(file.fileSize / 1024).toFixed(1)}
                    </td>
                    <td className="border px-3 py-2">
                      <a
                        href={`/api/suppliers/${supplier.ID || supplierId}/attachments/${encodeURIComponent(file.fileName)}`}
                        download={file.fileName}
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDetailModal;
