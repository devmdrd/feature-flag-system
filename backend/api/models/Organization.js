const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Organization = sequelize.define('Organization', {
  id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
}, { timestamps: true, updatedAt: false });

module.exports = Organization;
