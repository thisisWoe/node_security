// noinspection JSCheckFunctionSignatures

// configurazione environment
const {loadEnvironment} = require('./config/environments-config');
loadEnvironment();
const port = process.env.PORT;

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");

// configurazione sequelize e relazioni DB
const sequelize = require('./config/sequelize');
const relations = require('./models/relations/db_relations');
// configurazione passport per login con Google
const passportSetup = require('./config/passport-setup');
// middlewares
const {limiter, helmet, corsOptions, logger} = require('./middleware/middleware');
// Definizione delle rotte
const routes = require('./api/routes/routes');
// user roles
const {createInitialRoles} = require('./api/services/auth.service');

// middlewares
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
// Logga metodo HTTP, URL della richiesta e, opzionalmente, l'indirizzo IP del client
app.use((req, res, next) => {
    logger.info(
        `
    METHOD: ${req.method}
    URL: ${process.env.HOST}${req.url}
    HEADERS: ${JSON.stringify(req.headers)}`, {ip: req.ip});
    next();
});

// Prefisso '/api' alle rotte definite in routes
app.use('/api', routes);
// Serve i file statici dalla cartella di build di Angular
app.use('/api/app-angular/', express.static(path.join(__dirname, '/client/node_security/dist/node_security/browser')));

// Connessione al database, configurazione, ecc.
sequelize.sync({alter: true}).then(() => {
    logger.info('\nDatabase e modelli sincronizzati');
    createInitialRoles().then(() => {
        logger.info('\nOperazioni sui ruoli completate');
        app.listen(port, () => {
            logger.info(`Applicazione in ascolto sulla porta ${port}
 ================================================================
 
 URL: ${process.env.HOST}/api\n
 CLIENT: http://localhost:${port}/api/app-angular
 
 ================================================================
`);
        });
    });
});
