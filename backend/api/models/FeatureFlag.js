const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const FeatureFlag = sequelize.define('FeatureFlag', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key:            { type: DataTypes.STRING(100), allowNull: false },
  enabled:        { type: DataTypes.BOOLEAN, defaultValue: false },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Organizations', key: 'id' },
  },
}, {
  timestamps: true,
  indexes: [{ unique: true, fields: ['organizationId', 'key'] }],
});

module.exports = FeatureFlag;
