const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./../config/sequelize'); // Aggiusta il percorso in base alla tua struttura

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users'
});

module.exports = User;
