const express = require('express');

// Importa i controller che gestiscono le tue richieste
const {
    registerUser,
    loginUser,
    sendEmailResetPsw,
    changePassword,
    confirmRegistration,
    registerUserWithGoogle,
    retrieveTokenAfterGoogleAuth
} = require('./../controllers/auth.controller');
const {assignRole, deAssignRole} = require('./../controllers/role.controller');
const {authenticateToken, authorizeRoles} = require('../../middleware/middleware');
// const { getJson } = require('./../controllers/review.controller');

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
router.get('/register/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => res.redirect('/oauth'));

router.get('/oauth', registerUserWithGoogle);

router.get('/userinfo', retrieveTokenAfterGoogleAuth);


module.exports = router;