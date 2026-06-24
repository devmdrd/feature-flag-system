const { Sequelize } = require('sequelize');
const { DEFAULT_DB_HOST, DEFAULT_DB_NAME } = require('../utils/constants');

const sequelize = new Sequelize(
  DEFAULT_DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: DEFAULT_DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
