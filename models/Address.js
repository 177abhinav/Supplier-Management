module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Address', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    street: {
      type: DataTypes.STRING(200),
      field: 'street'
    },
    line2: {
      type: DataTypes.STRING(200),
      field: 'line2'
    },
    line3: {
      type: DataTypes.STRING(200),
      field: 'line3'
    },
    city: {
      type: DataTypes.STRING(100),
      field: 'city'
    },
    postalCode: {
      type: DataTypes.STRING(20),
      field: 'postalCode'
    },
    country: {
      type: DataTypes.STRING(100),
      field: 'country'
    },
    region: {
      type: DataTypes.STRING(100),
      field: 'region'
    }
  }, {
    tableName: 'addresses',
    timestamps: false
  });
};