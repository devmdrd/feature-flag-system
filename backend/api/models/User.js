const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('User', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email:          { type: DataTypes.STRING, allowNull: false, unique: true },
  password:       { type: DataTypes.STRING, allowNull: false },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Organizations', key: 'id' },
  },
}, { timestamps: true, updatedAt: false });

module.exports = User;
