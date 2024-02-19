const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./../config/sequelize');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Role;
