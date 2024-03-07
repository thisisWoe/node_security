// services/authService.js
const bcrypt = require('bcrypt');
const User = require('./../../models/userModel');
const ResetToken = require('./../../models/resetTokenModel');
const {
    generateToken,
    userSchemaRegistration,
    userSchemaLogin,
    userSchemaRegistrationGoogle
} = require('../../middleware/middleware');
const roleService = require('./role.service');

const register = async (userData) => {
    if (userData.confirmed) throw new Error('Il campo di conferma non può essere impostato.');
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
    try {
        let transporter = createTransporter();
        const jwtToken = createJwtForActions(user, "confirm-registration");
        const resetUrl = `${process.env.CONFIRM_REGISTRATION_URL}/${jwtToken}`;
        let mailOptions = {
            from: `${process.env.TITLE_MAIL} <${process.env.SENDIN_BLUE_EMAIL}>`, // mittente
            to: email, // lista dei destinatari
            subject: `${process.env.SUBJECT_MAIL}`, // Oggetto
            html: `
                    <div style="display: flex; justify-content: center; align-items: center; height: 200px;">
                        <h1>Clicca sul bottone qui sotto per confermare la tua registrazione!</h1>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; height: 200px;">
                        <a href=\"${resetUrl}\">
                            <button style="border-radius: 1rem; background-color: blue; color: white; height: 50px" >
                                Conferma Registrazione
                            </button>
                        </a>
                    </div>
                  `
        };
        // Invia l'email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error.message);
            }
        });
    } catch (e) {
        throw new Error(e.message);
    }
    
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

const confirmRegistration = async (token) => {
    const {tokenJwt} = token;
    const {userId, purpose} = jwt.decode(tokenJwt);
    
    if (!tokenJwt) throw new Error('Token JWT non valido.');
    if (!purpose) throw new Error('Token JWT non valido.');
    if (!userId) throw new Error('Utente non trovato.');
    if (purpose !== "confirm-registration") throw new Error('Token non abilitato per questa operazione.');
    
    jwt.verify(tokenJwt, process.env.JWT_SECRET, (err) => {
        if (err) {
            throw new Error('Token non abilitato per questa operazione.');
        }
    });
    
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Nessun utente trovato.');
    
    user.confirmed = true;
    
    await user.save();
    
    return user;
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

const config = require('./../../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: config.sendin_blue_host,
        port: config.sendin_blue_port,
        secure: false, // true per 465, false per altre porte
        auth: {
            user: config.sendin_blue_email, // sostituisci con il tuo indirizzo email SendinBlue
            pass: config.sendin_blue_key // sostituisci con la tua password SMTP di SendinBlue
        },
        logger: true, // Attiva il logging
        debug: true,
    });
};

const createJwtForActions = (user, actions) => {
    return jwt.sign(
        {
            userId: user.id,
            purpose: actions
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.TEMPORARY_TOKEN} // Il token scade dopo 1 ora
    );
};
const sendPasswordResetEmail = async (emailObj) => {
    const {email} = emailObj;
    const user = await User.findOne({where: {email}});
    if (!user) throw new Error('Nessun utente trovato con questa email.');
    
    try {
        // Crea il transporter di Nodemailer usando le credenziali SMTP di SendinBlue
        let transporter = createTransporter();
        
        const jwtToken = createJwtForActions(user, "password-reset");
        
        const resetUrl = `${process.env.RESET_PASSWORD_URL}/${jwtToken}`;
        
        // Configura l'email da inviare
        let mailOptions = {
            from: `${process.env.TITLE_MAIL} <${process.env.SENDIN_BLUE_EMAIL}>`, // mittente
            to: email, // lista dei destinatari
            subject: `${process.env.SUBJECT_MAIL}`, // Oggetto
            html: `
<div style="display: flex; justify-content: center; align-items: center; height: 200px;">
    <h1>Clicca sul bottone qui sotto per resettare la tua password!</h1>
</div>
<div style="display: flex; justify-content: space-between; align-items: center; height: 200px;">
    <a href=\"${resetUrl}\">
        <button style="border-radius: 1rem; background-color: blue; color: white; height: 50px" >
            Resetta Password
        </button>
    </a>
</div>
` // corpo dell'email in formato HTML
        };
        
        // Invia l'email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error(error.message);
            }
        });
        
        return 'Email per il reset della password inviata.';
    } catch (e) {
        throw new Error(e.message);
    }
};

const changePassword = async (data) => {
    const {tokenJwt, newPassword} = data;
    const {userId, purpose} = jwt.decode(tokenJwt);
    
    if (!tokenJwt) throw new Error('Token JWT non valido.');
    if (!purpose) throw new Error('Token JWT non valido.');
    if (!userId) throw new Error('Utente non trovato.');
    if (!newPassword) throw new Error('Nessuna password inviata.');
    
    if (purpose !== "password-reset") throw new Error('Token non abilitato per questa operazione.');
    
    jwt.verify(tokenJwt, process.env.JWT_SECRET, (err) => {
        if (err) {
            throw new Error('Token non abilitato per questa operazione.');
        }
    });
    
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Nessun utente trovato.');
    
    user.password = await bcrypt.hash(newPassword, 10);
    
    await user.save();
    
    return user;
};

const axios = require('axios');
const qs = require('node:querystring');

const getToken = async (code) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI_GOOGLE,
        grant_type: 'authorization_code'
    };
    
    try {
        const response = await axios.post(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data; // Questo oggetto contiene il token di accesso e il token di refresh
    } catch (error) {
        throw new Error(error);
    }
};

const getUserInfo = async (accessToken) => {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data; // Questo oggetto contiene informazioni sull'utente
    } catch (error) {
        throw new Error(error);
    }
};

const registerWithGoogle = async (googleData) => {
    
    if (!googleData) throw new Error('Si è verificato un errore durante l\'autenticazione.');
    const {name, email, id} = googleData;
    const googleObj = {username: name, email: email, id: id};
    // Validazione dell'input
    const {error} = userSchemaRegistrationGoogle.validate(googleObj);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const userExists = await User.findOne({where: {email}});
    if (userExists) {
        throw new Error('L\'email è già in uso.');
    }

    const user = await User.create({
        username:name,
        email:email,
        id:id,
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

module.exports = {
    register,
    login,
    createInitialRoles,
    sendPasswordResetEmail,
    changePassword,
    confirmRegistration,
    getToken,
    getUserInfo
};
