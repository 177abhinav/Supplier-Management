const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

exports.uploadFile = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read file as base64 string (for LargeString storage)
    const fileBuffer = await fs.readFile(req.file.path);
    const base64Content = fileBuffer.toString('base64');
    
    const db = require('../models');
    await db.Attachment.create({
      ID: uuidv4(),
      supplierId: id,
      supplierName: req.body.supplierName, // Should be passed in request
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      content: fileBuffer, // Store as base64 string
      fileSize: req.file.size,
      uploadedAt: new Date()
    });

    // Clean up temporary file
    await fs.unlink(req.file.path);

    res.json({ 
      message: `File uploaded successfully: ${req.file.originalname}`,
      fileName: req.file.originalname
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: "Failed to upload file" });
  }
};