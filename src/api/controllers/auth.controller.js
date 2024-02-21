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
    console.log(data);
    try {
        const result = await authService.changePassword(data);
        res.status(200).json({
            message: 'Password aggiornata con successo.',
            data: result
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: "Errore durante il cambio della password.\n" + error.message});
    }
};


module.exports = {registerUser, loginUser, sendEmailResetPsw, changePassword};