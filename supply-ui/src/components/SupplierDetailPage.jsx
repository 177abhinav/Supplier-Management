// src/components/SupplierDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SupplierDetailPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/suppliers/${id}`);
        if (!response.ok) throw new Error('Failed to load supplier details');
        const data = await response.json();
        setSupplier(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading supplier details...</p>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Supplier Not Found</h3>
          <p className="text-gray-600 mb-8">The requested supplier could not be located in our system.</p>
          <button
            onClick={() => navigate('/suppliers')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Suppliers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* 👉 LEFT-ALIGNED HEADING — Matches Suppliers List Style */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-800">
                Supplier Details
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-3"></div>
            </div>
            <button
              onClick={() => navigate('/suppliers')}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </button>
          </div>
        </div>

        {/* 👉 Supplier & Contact Info — Side by Side Cards (Glassmorphism Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Supplier Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 ml-4">Supplier Information</h2>
            </div>
            <dl className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Supplier Name</dt>
                <dd className="text-lg font-semibold text-gray-900">{supplier.supplierName}</dd>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Country</dt>
                <dd className="text-lg text-gray-800">{supplier.country || '—'}</dd>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">City</dt>
                <dd className="text-lg text-gray-800">{supplier.city || '—'}</dd>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Region</dt>
                <dd className="text-lg text-gray-800">{supplier.region || '—'}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-semibold text-gray-600">Status</dt>
                <dd>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    supplier.status === 'Active' ? 'bg-green-100 text-green-800' :
                    supplier.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    supplier.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {supplier.status || 'Unknown'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 ml-4">Contact Information</h2>
            </div>
            <dl className="space-y-5">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Full Name</dt>
                <dd className="text-lg font-medium text-gray-900">{`${supplier.firstName || ''} ${supplier.lastName || ''}`.trim() || '—'}</dd>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Email</dt>
                <dd className="text-lg text-blue-600 break-all hover:text-blue-800 transition-colors duration-200">
                  {supplier.email || '—'}
                </dd>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <dt className="text-sm font-semibold text-gray-600">Phone</dt>
                <dd className="text-lg text-gray-800">{supplier.phone || '—'}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-semibold text-gray-600">Category</dt>
                <dd className="text-lg text-gray-800">{supplier.category || '—'}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 👉 Additional Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.98-6.123-2.577M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">Additional Information</h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {supplier.additionalInfo || 'No additional information provided.'}
            </p>
          </div>
        </div>

        {/* 👉 Attachments Card */}
        {supplier.attachments && supplier.attachments.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 ml-4">Attachments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">File Name</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wider">Size (KB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {supplier.attachments.map((file, idx) => (
                    <tr key={idx} className="hover:bg-green-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{file.fileName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{file.fileType}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{(file.fileSize / 1024).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDetailPage;