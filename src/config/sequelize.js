const { Sequelize } = require('sequelize');
const config = require('./config');
// Creazione di un'istanza Sequelize utilizzando le configurazioni specificate
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    // Altre opzioni...
});

// console.log('sequelize', sequelize)

module.exports = sequelize;