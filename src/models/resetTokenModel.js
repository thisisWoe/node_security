
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Aggiusta il percorso in base alla tua configurazione

const ResetToken = sequelize.define('ResetToken', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = ResetToken;
