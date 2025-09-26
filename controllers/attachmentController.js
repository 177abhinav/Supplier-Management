// controllers/attachmentController.js
exports.downloadFile = async (req, res) => {
  const { id, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  
  try {
    const db = require('../models');
    const attachment = await db.Attachment.findOne({
      where: { 
        supplierId: id, 
        fileName: decodedFilename 
      }
    });
    
    if (!attachment) {
      return res.status(404).json({ error: "File not found" });
    }
    
    // Send raw binary data directly (no base64 conversion needed)
    res.setHeader('Content-Disposition', `attachment; filename="${decodedFilename}"`);
    res.setHeader('Content-Type', attachment.mimeType);
    res.setHeader('Content-Length', attachment.fileSize);
    res.send(attachment.content); // ✅ This is already a Buffer
    
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: "Error downloading file" });
  }
};