const path = require('path');
const {logger} = require('../middleware/middleware');

const loadEnvironment = () => {
    const environment = process.env.NODE_ENV || 'development';
    logger.info('ENVIRONMENT: ' + environment);
    const dotEnvPath = path.resolve(__dirname, `../../.env.${environment}`);
    const result = require('dotenv').config({path: dotEnvPath});
    
    if (result.error) {
        logger.error('DOTENV NOT FOUND');
    } else {
        logger.info('DOTENV SUCCESSFULLY FOUND');
    }
}

module.exports = {loadEnvironment};
