const db = require('./db.controller');

const addEmployee = async(req,res) => {
    try {
        await db.addEmployee(req, res);
        //res.send('respond with a resource add employee');
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const getAllEmployees = async(req, res) => {
    try {
        await db.getAllEmployees(req,res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const updateEmployee = async(req, res) => {
    try {
        await db.updateEmployee(req,res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const deleteEmployee = async(req, res) => {
    try {
        await db.deleteEmployee(req,res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const getFilteredEmployees = async(req, res) => {
    try {
        await db.getFilteredEmployees(req, res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

module.exports = {
    addEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getFilteredEmployees
}