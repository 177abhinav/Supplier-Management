module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Approver', {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'name'
    },
    email: {
      type: DataTypes.STRING(200),
      field: 'email'
    },
    country: {
      type: DataTypes.STRING(50),
      field: 'country'
    },
    level: {
      type: DataTypes.STRING,
      field: 'level'
    }
  }, {
    tableName: 'approvers',
    timestamps: false
  });
};