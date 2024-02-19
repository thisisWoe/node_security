const Role = require('./../../models/roleModel');
const User = require('./../../models/userModel');

const findUserRoles = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                through: {attributes: []}, // Esclude gli attributi dalla tabella di join UserRole
            }]
        });
        
        if (!user) {
            console.log('Utente non trovato.');
            return [];
        }
        
        // Assumendo che la proprietà per i ruoli sia denominata in base al plurale del modello Role
        // Ad esempio "Roles" per convenzione di Sequelize
        return user["Roles"] ? user["Roles"].map(role => role.name) : [];
    } catch (error) {
        console.error('Errore durante la ricerca dei ruoli dell\'utente:', error);
        throw error;
    }
};

module.exports = {findUserRoles};