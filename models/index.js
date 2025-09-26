const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.Supplier = require('./Supplier')(sequelize, Sequelize.DataTypes);
db.Address = require('./Address')(sequelize, Sequelize.DataTypes);
db.Contact = require('./Contact')(sequelize, Sequelize.DataTypes);
db.CategoryRegion = require('./CategoryRegion')(sequelize, Sequelize.DataTypes);
db.AdditionalInfo = require('./AdditionalInfo')(sequelize, Sequelize.DataTypes);
db.Attachment = require('./Attachment')(sequelize, Sequelize.DataTypes);
db.Approver = require('./Approver')(sequelize, Sequelize.DataTypes);
db.ApproverComment = require('./ApproverComment')(sequelize, Sequelize.DataTypes);

// Define associations
// Define associations
db.Supplier.hasOne(db.Address, { foreignKey: 'supplierId', as: 'mainAddress' });
db.Address.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

db.Supplier.hasOne(db.Contact, { foreignKey: 'supplierId', as: 'primaryContact' });
db.Contact.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

db.Supplier.hasOne(db.CategoryRegion, { foreignKey: 'supplierId', as: 'categoryAndRegion' });
db.CategoryRegion.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

db.Supplier.hasOne(db.AdditionalInfo, { foreignKey: 'supplierId', as: 'additionalInfo' });
db.AdditionalInfo.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

db.Supplier.hasMany(db.Attachment, { foreignKey: 'supplierId', as: 'attachments' });
db.Attachment.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' }); // ← This was missing!

db.Approver.hasMany(db.ApproverComment, { foreignKey: 'approverId', as: 'approverComments' });
db.ApproverComment.belongsTo(db.Approver, { foreignKey: 'approverId', as: 'approver' });

db.Supplier.hasMany(db.ApproverComment, { foreignKey: 'supplierId', as: 'supplierComments' });
db.ApproverComment.belongsTo(db.Supplier, { foreignKey: 'supplierId', as: 'supplier' });

module.exports = db;