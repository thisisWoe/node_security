const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        backend_port: process.env.PORT,
        sendin_blue_email: process.env.SENDIN_BLUE_EMAIL,
        sendin_blue_key: process.env.SENDIN_BLUE_KEY,
        sendin_blue_host: process.env.SENDIN_BLUE_HOST,
        sendin_blue_port: process.env.SENDIN_BLUE_PORT
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        backend_port: process.env.PORT
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        backend_port: process.env.PORT
    }
};

// Utilizzo NODE_ENV per selezionare la configurazione corretta; default a 'development' se non impostato
const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];

// module.exports = config;
