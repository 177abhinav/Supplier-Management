// services/excelService.js
const ExcelJS = require('exceljs');

exports.generateExcelWithSuppliersAndApprovers = async (suppliers, approvers, res) => {
  const workbook = new ExcelJS.Workbook();

  // Suppliers Sheet (already correct)
  const supplierSheet = workbook.addWorksheet('Suppliers');
  supplierSheet.columns = [
    { header: 'ID', key: 'id', type: 'string' },  // ✅ Add type: 'string'
    { header: 'Supplier Name', key: 'supplierName' },
    { header: 'Street', key: 'street' },
    { header: 'Line2', key: 'line2' },
    { header: 'Line3', key: 'line3' },
    { header: 'City', key: 'city' },
    { header: 'Postal Code', key: 'postalCode' },
    { header: 'Country', key: 'country' },
    { header: 'Region', key: 'region' },
    { header: 'First Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'Phone', key: 'phone' },
    { header: 'Category', key: 'category' },
    { header: 'Info Region', key: 'infoRegion' },
    { header: 'Additional Info', key: 'additionalInfo' }
  ];

  suppliers.forEach(s => {
    supplierSheet.addRow({
      id: s.ID?.toString() || '',  // ✅ Convert to string
      supplierName: s.supplierName,
      street: s.mainAddress?.street || '',
      line2: s.mainAddress?.line2 || '',
      line3: s.mainAddress?.line3 || '',
      city: s.mainAddress?.city || '',
      postalCode: s.mainAddress?.postalCode || '',
      country: s.mainAddress?.country || '',
      region: s.mainAddress?.region || '',
      firstName: s.primaryContact?.firstName || '',
      lastName: s.primaryContact?.lastName || '',
      email: s.primaryContact?.email || '',
      phone: s.primaryContact?.phone || '',
      category: s.categoryAndRegion?.category || '',
      infoRegion: s.categoryAndRegion?.region || '',
      additionalInfo: s.additionalInfo?.details || ''
    });
  });

  // Approvers Sheet
  const approverSheet = workbook.addWorksheet('Approvers');
  approverSheet.columns = [
    { 
      header: 'ID', 
      key: 'id', 
      type: 'string',           // ✅ Force text format
      width: 10                 // ✅ Set explicit width
    },
    { 
      header: 'Name', 
      key: 'name',
      width: 20
    },
    { 
      header: 'Email', 
      key: 'email',
      width: 30
    },
    { 
      header: 'Level', 
      key: 'level',
      width: 10
    },
    { 
      header: 'Country', 
      key: 'country',
      width: 15
    }
  ];

  approvers.forEach(a => {
    approverSheet.addRow({
      id: a.id?.toString() || '',  // ✅ Convert to string
      name: a.name,
      email: a.email,
      level: a.level,
      country: a.country
    });
  });

  // Generate filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `Suppliers_And_Approvers_${timestamp}.xlsx`;

  // Set headers
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  // Write to response
  await workbook.xlsx.write(res);
  res.end();
};