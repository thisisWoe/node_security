// require('dotenv').config(); // Assicurati di avere dotenv configurato se usi variabili d'ambiente

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        backend_port: process.env.PORT
    },
    test: {
        // Configurazione per l'ambiente di test
    },
    production: {
        // Configurazione per l'ambiente di produzione
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        // Altre opzioni, come SSL, ecc...
    }};

// console.log('config',config);

module.exports = config;
