const { Sequelize } = require('sequelize');

const db = new Sequelize(
    'ordenes_de_trabajo',
    'root',
    '0103',
    {
    host: 'localhost',
    dialect: 'mysql'
    });

module.exports = db;