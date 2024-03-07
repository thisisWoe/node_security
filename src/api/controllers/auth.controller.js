const authService = require('./../services/auth.service');

const registerUser = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({
            message: 'Utente registrato con successo',
            data: result,
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json({
            message: 'Login effettuato con successo.',
            data: result,
        });
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

const sendEmailResetPsw = async (req, res) => {
    console.log('body', req.body)
    try {
        const result = await authService.sendPasswordResetEmail(req.body);
        res.status(200).json({
            message: result
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const changePassword = async (req, res) => {
    const data = req.body;
    try {
        const result = await authService.changePassword(data);
        res.status(200).json({
            message: 'Password aggiornata con successo.',
            data: result
        })
    } catch (error) {
        return res.status(500).send({message: "Errore durante il cambio della password.\n" + error.message});
    }
};

const confirmRegistration = async (req, res) => {
    const token = req.body;
    try {
        const result = await authService.confirmRegistration(token);
        res.status(200).json({
            message: 'Registrazione utente confermata.',
            data: result
        })
    } catch (error) {
        return res.status(500).send({message: "Errore durante la conferma della registrazione.\n" + error.message});
    }
};

const registerUserWithGoogle = async (req, res) => {
    const code = req.query.code;
    try {
        const token = await authService.getToken(code);
        const userInfo = await authService.getUserInfo(token.access_token);
        const resRegistrationUserGoogle = await authService.registerWithGoogle(userInfo);
        const jwtToken = await authService.loginWithGoogle(resRegistrationUserGoogle.user.username);
        
        res.status(200).json(jwtToken);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};



module.exports = {
    registerUser,
    loginUser,
    sendEmailResetPsw,
    changePassword,
    confirmRegistration,
    registerUserWithGoogle,
};