// noinspection JSCheckFunctionSignatures

const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const {logger} = require('./middleware/middleware'); // Assicurati che il percorso sia corretto

// configurazione sequelize
const sequelize = require('./config/sequelize');
// relazioni DB
require('./models/relations/db_relations');

// Questo middleware incorporato in Express analizza le richieste in entrata con payload JSON, rendendo accessibile il corpo della richiesta tramite req.body
app.use(express.json());
// middlewares
const {limiter, helmet} = require('./middleware/middleware');
app.use(helmet());
app.use(limiter);
app.use((req, res, next) => {
    // Logga metodo HTTP, URL della richiesta e, opzionalmente, l'indirizzo IP del client
    logger.info(`-------\nMETHOD: ${req.method}
URL: http://localhost:${port}${req.url}
HEADERS: ${JSON.stringify(req.headers)}`, {ip: req.ip});
    // Assicurati di chiamare next() per passare al prossimo middleware o gestore di rotta
    next();
});
// Definizione delle rotte
const routes = require('./api/routes/routes');
app.use('/api', routes); // Prefisso '/api' alle rotte definite in routes

// importo la funzione che gestisce i ruoli
const {createInitialRoles} = require('./api/services/auth.service');
// Connessione al database, configurazione, ecc.
sequelize.sync().then(() => {
    logger.info('\nDatabase e modelli sincronizzati');
    createInitialRoles().then(() => {
        logger.info('\nOperazioni sui ruoli completate');
        app.listen(port, () => {
            logger.info(`Applicazione in ascolto sulla porta ${port}
 ================================================================
 
 URL: http://localhost:${port}/api
 
 ================================================================
`);
        });
    });
});