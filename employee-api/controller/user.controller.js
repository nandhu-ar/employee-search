const db = require('./db.controller');

const addUser = async (req, res) => {
    try {
        await db.addUser(req, res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const validateLogin = async (req, res) => {
    try {
        await db.validateLogin(req, res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

module.exports = {
    addUser,
    validateLogin
}