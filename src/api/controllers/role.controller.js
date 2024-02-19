const roleService = require('./../services/role.service');

const assignRole = async (req, res) => {
    try {
        const result = await roleService.assignRole(req.body);
        res.status(201).json({
            message: result
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deAssignRole = async (req, res) => {
    try {
        const result = await roleService.deAssignRole(req.body);
        res.status(201).json({
            message: result
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {assignRole, deAssignRole};