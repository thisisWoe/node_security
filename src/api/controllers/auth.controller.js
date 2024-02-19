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


module.exports = {registerUser, loginUser};