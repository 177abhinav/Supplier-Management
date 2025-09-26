module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CategoryRegion', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    category: {
      type: DataTypes.STRING(100),
      field: 'category'
    },
    region: {
      type: DataTypes.STRING(100),
      field: 'region'
    }
  }, {
    tableName: 'category_regions',
    timestamps: false
  });
};