// routes/index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const supplierController = require('../controllers/supplierController');
const approverController = require('../controllers/approverController');
const uploadController = require('../controllers/uploadController');
const attachmentController = require('../controllers/attachmentController');
const excelService = require('../services/excelService');
const db = require('../models');

const router = express.Router();

// Middleware
router.use(cors({ origin: 'http://localhost:5173' }));
router.use(express.json());

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/temp');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.post('/api/submit', supplierController.submitSupplier);
router.get('/api/suppliers', supplierController.getAllSuppliers);
router.get('/api/suppliers/:id', supplierController.getSupplierById);

router.get('/api/approvers', approverController.getAllApprovers);
router.post('/api/approvers', approverController.createApprover);
router.put('/api/approvers/:id', approverController.updateApprover);
router.post('/api/suppliers/:id/upload', upload.single('file'), uploadController.uploadFile);
router.get('/api/suppliers/:id/attachments/:filename', attachmentController.downloadFile);

// Excel Export
router.get('/api/download-excel', async (req, res) => {
  try {
     const suppliers = await db.Supplier.findAll({ 
      include: [
        { model: db.Address, as: 'mainAddress' },
        { model: db.Contact, as: 'primaryContact' },
        { model: db.CategoryRegion, as: 'categoryAndRegion' },
        { model: db.AdditionalInfo, as: 'additionalInfo' },
        { model: db.Attachment, as: 'attachments' }
      ]
    });
    const approvers = await db.Approver.findAll();
    await excelService.generateExcelWithSuppliersAndApprovers(suppliers, approvers, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;