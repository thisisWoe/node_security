const express = require('express');

// Importa i controller che gestiscono le tue richieste
const { registerUser, loginUser } = require('./../controllers/auth.controller');
//const { getJson } = require('./../controllers/review.controller');

const router = express.Router();

// Definizione delle rotte
router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/export-src-code', getJson);

// Puoi aggiungere altre rotte qui

module.exports = router;