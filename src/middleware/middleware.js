const jwt = require('jsonwebtoken');
const Joi = require('joi');

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

// Middleware per proteggere le routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.status(401).json({errore: 'Non sei autenticato.'});
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({errore: 'Non sei autorizzato per questa operazione.'});
        }
        req.user = user;
        next();
    });
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({message: "Ruolo utente mancante o non valido."});
        }
        
        const allowedRolesLower = new Set(allowedRoles.map(role => role.toLowerCase()));
        const hasRole = req.user.roles.some(userRole => allowedRolesLower.has(userRole.toLowerCase()));
        
        if (!hasRole) {
            return res.status(403).json({message: "Accesso non consentito per il ruolo dell'utente."});
        }
        
        next();
    };
};

// Uso Helmet per impostare in modo sicuro le intestazioni HTTP.
const helmet = require('helmet');
// uso express-rate-limit per controllare il numero massimo di chiamate da uno stesso IP
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuti
    max: 100, // limite ogni IP a 100 richieste per windowMs
    message: 'Troppe richieste da questo IP, riprova più tardi.'
});

// uso winston per i log
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Imposto il livello minimo di log
    format: winston.format.combine(
        winston.format.timestamp(), // Aggiungo un timestamp ai log
        winston.format.json() // Formatto i log come JSON
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(), // Uso un formato semplice per i log nella console
        }),
        new winston.transports.File({filename: 'combined.log'}) // Salvo i log in un file
    ]
});

module.exports = {
    generateToken,
    userSchemaRegistration,
    userSchemaLogin,
    limiter,
    helmet,
    authorizeRoles,
    authenticateToken,
    logger
};