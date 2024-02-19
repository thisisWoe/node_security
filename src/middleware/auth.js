const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('./../models/userModel');

const generateToken = (user, roles) => {
    const payload = {
        user: user, // Includi l'ID dell'utente
        roles: roles
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
};

const userSchemaRegistration = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const userSchemaLogin = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});

// Middleware per proteggere le route


module.exports = {generateToken, userSchemaRegistration, userSchemaLogin};