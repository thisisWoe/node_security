const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./../config/sequelize');
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
        allowNull: true,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    auth_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'node'
    }
}, {
    tableName: 'users'
});



module.exports = User;
