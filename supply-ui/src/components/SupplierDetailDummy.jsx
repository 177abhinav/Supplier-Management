const SuppliersListPageDummy = () => {
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  const openModal = (id) => setSelectedSupplierId(id);
  const closeModal = () => setSelectedSupplierId(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <h1 className="text-4xl font-extrabold mb-6">Suppliers (Dummy)</h1>

      <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-blue-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">Supplier Name</th>
            <th className="px-6 py-3 text-left">City</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummySuppliers.map(s => (
            <tr key={s.ID} className="hover:bg-blue-50 cursor-pointer" onClick={() => openModal(s.ID)}>
              <td className="px-6 py-4">{s.supplierName}</td>
              <td className="px-6 py-4">{s.mainAddress.city}</td>
              <td className="px-6 py-4">{s.status}</td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => { e.stopPropagation(); openModal(s.ID); }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSupplierId && (
        <SupplierDetailModalDummy onClose={closeModal} />
      )}
    </div>
  );
};

export default SuppliersListPageDummy;
