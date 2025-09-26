module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ApproverComment', {
    ID: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'ID'
    },
    sup_name: {
      type: DataTypes.STRING(100),
      field: 'sup_name'
    },
    level: {
      type: DataTypes.STRING(50),
      field: 'level'
    },
    name: {
      type: DataTypes.STRING(100),
      field: 'name'
    },
    email: {
      type: DataTypes.STRING(200),
      field: 'email'
    },
    status: {
      type: DataTypes.STRING(30),
      field: 'status'
    },
    comment: {
      type: DataTypes.STRING(1000),
      field: 'comment'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt'
    }
  }, {
    tableName: 'approver_comments',
    timestamps: false
  });
};