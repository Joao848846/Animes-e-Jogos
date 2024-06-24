const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cadastro_user', 'jsilva', '1975', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

