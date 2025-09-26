module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Attachment', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    supplierName: {
      type: DataTypes.STRING(200),
      field: 'supplierName'
    },
    fileName: {
      type: DataTypes.STRING(255),
      field: 'fileName'
    },
    mimeType: {
      type: DataTypes.STRING(100),
      field: 'mimeType'
    },
    fileSize: {
      type: DataTypes.BIGINT,
      field: 'fileSize'
    },
    content: {
      type: DataTypes.BLOB('long'),
      field: 'content'
    },
    uploadedAt: {
      type: DataTypes.DATE,
      field: 'uploadedAt'
    }
  }, {
    tableName: 'attachments',
    timestamps: false
  });
};