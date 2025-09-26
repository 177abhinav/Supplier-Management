const db = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.submitSupplier = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const supplierId = uuidv4();
    
    // Create supplier
    const supplier = await db.Supplier.create({
      ID: supplierId,
      supplierName: req.body.supplierName,
      status: req.body.status || 'Pending',
      businessPartnerId: req.body.businessPartnerId
    }, { transaction });

    // Create address
    if (req.body.mainAddress) {
      await db.Address.create({
        ID: uuidv4(),
        ...req.body.mainAddress,
        supplierId: supplierId
      }, { transaction });
    }

    // Create contact
    if (req.body.primaryContact) {
      await db.Contact.create({
        ID: uuidv4(),
        ...req.body.primaryContact,
        supplierId: supplierId
      }, { transaction });
    }

    // Create category and region
    if (req.body.categoryAndRegion) {
      await db.CategoryRegion.create({
        ID: uuidv4(),
        ...req.body.categoryAndRegion,
        supplierId: supplierId
      }, { transaction });
    }

    // Create additional info
    if (req.body.additionalInfo) {
      await db.AdditionalInfo.create({
        ID: uuidv4(),
        details: req.body.additionalInfo.details,
        supplierId: supplierId
      }, { transaction });
    }

    await transaction.commit();
    res.status(201).json({ 
      message: "Form submitted successfully", 
      id: supplierId 
    });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    res.status(500).json({ error: "Submission failed" });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await db.Supplier.findAll({
      include: [
        { model: db.Address, as: 'mainAddress' },
        { model: db.Contact, as: 'primaryContact' },
        { model: db.CategoryRegion, as: 'categoryAndRegion' },
        { model: db.AdditionalInfo, as: 'additionalInfo' },
           { model: db.Attachment, as: 'attachments' } // ✅ alias added
      ]
    });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await db.Supplier.findByPk(req.params.id, {
      include: [
        { model: db.Address, as: 'mainAddress' },
        { model: db.Contact, as: 'primaryContact' },
        { model: db.CategoryRegion, as: 'categoryAndRegion' },
        { model: db.AdditionalInfo, as: 'additionalInfo' },
         { model: db.Attachment, as: 'attachments'} 
      ]
    });
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};