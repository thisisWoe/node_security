const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../config/sequelize'); // Aggiusta il percorso in base alla tua struttura

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Role;
