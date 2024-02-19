const User = require('./../userModel');
const Role = require('./../roleModel');


User.belongsToMany(Role, { through: 'UserRole' });
Role.belongsToMany(User, { through: 'UserRole' });
