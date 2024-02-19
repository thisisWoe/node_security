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

const getRoles = async () => {
    try {
        return await Role.findAll();
    } catch (err) {
        throw new Error('Errore nel trovare i ruoli.');
    }
};

const assignRole = async (req) => {
    if (!req) {
        throw new Error('Request body mancante.');
    }
    
    const allRoles = await getRoles();
    let {username, roles} = req;
    roles = roles.map(role => role.toUpperCase());
    // Trova l'utente in base allo username
    const user = await User.findOne({
        where: {username: username}
    });
    
    if (!user) {
        throw new Error('Nessun utente trovato con questo username.');
    }
    
    // Ottiengo i ruoli attuali dell'utente
    const userRoles = await findUserRoles(user.id);
    
    // Verifico se uno dei ruoli da assegnare è già presente
    const duplicateRoles = roles.filter(roleName => userRoles.includes(roleName));
    if (duplicateRoles.length > 0) {
        throw new Error(`L'utente ha già i seguenti ruoli: ${duplicateRoles.join(', ')}`);
    }
    
    // Filtro i ruoli da assegnare per includere solo quelli nuovi
    const rolesToAdd = allRoles.filter(role => roles.includes(role.name));
    
    // Assegno i nuovi ruoli all'utente
    for (const role of rolesToAdd) {
        await user.addRole(role);
    }
    
    return 'Ruolo/i assegnato/i con successo.';
};


const deAssignRole = async (req) => {
    if (!req) {
        throw new Error('Request body mancante.');
    }
    
    const allRoles = await getRoles();
    let {username, roles} = req;
    roles = roles.map(role => role.toUpperCase());
    // Trova l'utente in base allo username
    const user = await User.findOne({
        where: {username: username}
    });
    
    if (!user) {
        throw new Error('Nessun utente trovato con questo username.');
    }
    
    // Ottiengo i ruoli attuali dell'utente
    const userRoles = await findUserRoles(user.id);
    
    // Verifica se si sta tentando di rimuovere il ruolo "USER"
    if (roles.includes('USER')) {
        throw new Error('Non è permesso rimuovere il ruolo "USER".');
    }
    
    // Rimuovi i ruoli dall'utente
    const rolesToRemove = await Role.findAll({
        where: {name: roles}
    });
    
    await user.removeRoles(rolesToRemove);
    
    return 'Ruolo/i rimosso/i con successo.';
};


module.exports = {findUserRoles, assignRole, deAssignRole};