module.exports = (sequelize, DataTypes) => {
  return sequelize.define('AdditionalInfo', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    details: {
      type: DataTypes.STRING(100),
      field: 'details'
    }
  }, {
    tableName: 'additional_infos',
    timestamps: false
  });
};