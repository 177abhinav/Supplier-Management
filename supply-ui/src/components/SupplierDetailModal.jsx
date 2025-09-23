// SupplierDetailModal.jsx
import React, { useEffect, useState } from "react";

const SupplierDetailModal = ({ supplierId, onClose }) => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(`/api/suppliers/${supplierId}`);
        if (!res.ok) throw new Error("Failed to fetch supplier details");
        const data = await res.json();
        setSupplier(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!supplier) return null;

  // 🔹 Reusable Row Component
  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between py-1">
      <span className="font-medium text-gray-600 w-40">{label}</span>
      <span className="text-gray-900 flex-1">{value || "—"}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[900px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Supplier Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✖
          </button>
        </div>

        {/* Supplier + Contact side by side */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Supplier Information */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Supplier Information
            </h3>
            <InfoRow label="Supplier Name:" value={supplier.supplierName} />
            <InfoRow label="Country:" value={supplier.country} />
            <InfoRow label="City:" value={supplier.city} />
            <InfoRow label="Region:" value={supplier.region} />
            <InfoRow label="Status:" value={supplier.status} />
          </div>

          {/* Contact Information */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Contact Information
            </h3>
            <InfoRow label="Full Name:" value={supplier.contactName} />
            <InfoRow label="Email:" value={supplier.contactEmail} />
            <InfoRow label="Phone:" value={supplier.contactPhone} />
            <InfoRow label="Category:" value={supplier.category} />
          </div>
        </div>

        {/* Additional Information */}
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Additional Information
          </h3>
          <p className="text-gray-900">{supplier.additionalInfo || "N/A"}</p>
        </div>

        {/* Attachments */}
        {supplier.attachments?.length > 0 && (
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
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
                    <td className="border px-3 py-2">{file.fileType}</td>
                    <td className="border px-3 py-2">
                      {(file.fileSize / 1024).toFixed(1)}
                    </td>
                    <td className="border px-3 py-2">
                      <a
                        href={`/api/attachments/${file.id}/download`}
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
