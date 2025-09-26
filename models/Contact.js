module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    firstName: {
      type: DataTypes.STRING(100),
      field: 'firstName'
    },
    lastName: {
      type: DataTypes.STRING(100),
      field: 'lastName'
    },
    email: {
      type: DataTypes.STRING(200),
      field: 'email'
    },
    phone: {
      type: DataTypes.STRING(50),
      field: 'phone'
    }
  }, {
    tableName: 'contacts',
    timestamps: false
  });
};