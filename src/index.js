// noinspection JSCheckFunctionSignatures

const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

// configurazione sequelize
const sequelize = require('./config/sequelize');
// relazioni DB
require('./models/relations/db_relations');


app.use(express.json());
// impostazioni di sicurezza
const {limiter, helmet} = require('./middleware/auth');
app.use(helmet());
app.use(limiter);
// Definizione delle rotte
const routes = require('./api/routes/routes');
app.use('/api', routes); // Prefisso '/api' alle rotte definite in routes

// importo la funzione che gestisce i ruoli
const {createInitialRoles} = require('./api/services/auth.service');
// Connessione al database, configurazione, ecc.
sequelize.sync().then(() => {
    console.log(' ')
    console.log('Database e modelli sincronizzati');
    createInitialRoles().then(() => {
        console.log('Operazioni sui ruoli completate');
        app.listen(port, () => {
            console.log(`Applicazione in ascolto sulla porta ${port}`);
            console.log('================================================================');
            console.log(' ');
            console.log(`URL: http://localhost:${port}/api`);
            console.log(' ');
            console.log('================================================================');
        });
    });
});