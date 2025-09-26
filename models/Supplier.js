module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Supplier', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    supplierName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      field: 'supplierName'
    },
    status: {
      type: DataTypes.STRING(100),
      field: 'status'
    },
    businessPartnerId: {
      type: DataTypes.STRING,
      field: 'businessPartnerId'
    }
  }, {
    tableName: 'suppliers',
    timestamps: false
  });
};