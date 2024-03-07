const express = require('express');

// Importa i controller che gestiscono le tue richieste
const {
    registerUser,
    loginUser,
    sendEmailResetPsw,
    changePassword,
    confirmRegistration
} = require('./../controllers/auth.controller');
const {assignRole, deAssignRole} = require('./../controllers/role.controller');
const {authenticateToken, authorizeRoles} = require('../../middleware/middleware');
// const { getJson } = require('./../controllers/review.controller');
const {getToken, getUserInfo} = require('./../services/auth.service');

const router = express.Router();
const passport = require('passport');

// Definizione delle rotte
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/assign-role', authenticateToken, authorizeRoles('admin'), assignRole);
router.post('/de-assign-role', authenticateToken, authorizeRoles('admin'), deAssignRole);
router.post('/reset-password', sendEmailResetPsw);
router.post('/change-password', changePassword);
router.post('/confirm-registration', confirmRegistration);
// router.get('/export-src-code', getJson);
// Route per iniziare l'autenticazione
router.get('/register/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// Route di callback dopo l'autenticazione
router.get('/register/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        // Autenticazione riuscita, reindirizza alla home.
        res.redirect('/oauth');
    }
);
router.get('/oauth', async (req, res) => {
    const code = req.query.code;
    console.log('code', code);
    const token = await getToken(code);
    console.log(token);
    const userInfo = await getUserInfo(token.access_token);
    console.log(userInfo);
    res.send('<h1>Route di arrivo dopo autenticazione Google</h1>');
});

module.exports = router;


// http://localhost:3000/api/oauth?code=4%2F0AeaYSHBOImBYTYoADgqcfiqI3RM_EQvGsO22dvVXfnfsBGLzPJZXUixiORt1H0F4_f4vwA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent