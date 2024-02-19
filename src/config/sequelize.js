const {Sequelize} = require('sequelize');
const config = require('./config');
// Creazione di un'istanza Sequelize utilizzando le configurazioni specificate
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    // Altre opzioni...
});

module.exports = sequelize;