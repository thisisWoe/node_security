// services/authService.js
const bcrypt = require('bcrypt');
const User = require('./../../models/userModel');
const {generateToken, userSchemaRegistration, userSchemaLogin} = require('../../middleware/middleware');
const roleService = require('./role.service');

const register = async (userData) => {
    const {username, email, password} = userData;
    // Validazione dell'input
    const {error} = userSchemaRegistration.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const userExists = await User.findOne({where: {email}});
    if (userExists) {
        throw new Error('L\'email è già in uso.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    // Trova il ruolo di default (es. 'user')
    const defaultRole = await Role.findOne({where: {name: 'USER'}});
    if (!defaultRole) {
        throw new Error('Ruolo di default non trovato.');
    }
    await user.addRole(defaultRole);
    
    return {
        user: {id: user.id, username: user.username, email: user.email}
    };
};

const login = async (loginData) => {
    const {username, password} = loginData;
    
    // Validazione dell'input
    const {error} = userSchemaLogin.validate(loginData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    
    const user = await User.findOne({where: {username}});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Username o password non corretti.');
    }
    
    const roles = await roleService.findUserRoles(user.id);
    const userJwt = {id: user.id, username: user.username, email: user.email};
    
    return {
        token: generateToken(userJwt, roles),
    };
};

const Role = require('./../../models/roleModel');
const initialRoles = ['ADMIN', 'MODERATOR', 'USER'];
const createInitialRoles = async () => {
    await Promise.all(initialRoles.map(async (roleName) => {
        const role = await Role.findOne({where: {name: roleName}});
        if (!role) {
            await Role.create({name: roleName});
            console.log(`Role ${roleName} created.`);
        }
    }));
};

module.exports = {register, login, createInitialRoles};
