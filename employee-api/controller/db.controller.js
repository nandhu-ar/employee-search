const mongoose = require('mongoose');
const { employeeModel,userModel } = require('../models/db.model');

const connection = async () => {
    return await mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

const addEmployee = async (req, res) => {
    try {
        const employee = req.body;
        await connection();
        const isEmployeePresent = await employeeModel.find({EmailId: employee.EmailId});
        if(isEmployeePresent.length){
            res.status(200).json({"message": `Employee with email ${employee.EmailId} already exists` })
            return;
        }
        const lastInserted = await employeeModel.find().sort({ EmployeeId: -1 }).limit(1);
        employee.EmployeeId = 1;
        if (lastInserted.length) {
            employee.EmployeeId = parseInt(lastInserted[0].EmployeeId, 10) + 1;
        }
        await employeeModel.create(employee);
        mongoose.disconnect();
        res.status(200).json({ "message": "Employee Details successfully saved" });
    } catch (error) {
        res.status(404).json({ "error": "unable to add employee details" });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = req.body;
        await connection();
        await employeeModel.findOneAndUpdate({EmployeeId: employee.EmployeeId},employee);
        mongoose.disconnect();
        res.status(200).json({ "message": "Employee Details updated successfully saved" });
    } catch (error) {
        console.log("error", error)
        res.status(404).json({ "error": "unable to add employee details" });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.EmployeeId;
        await connection();
        const response = await employeeModel.findOneAndDelete({EmployeeId: employeeId});
        mongoose.disconnect();
        if(response){
            res.status(200).json({ "message": "Employee Details deleted successfully" });
        }
        else{
            res.status(200).json({ "message": "Unable to find employee details or may have been already deleted" });
        }
    } catch (error) {
        res.status(404).json({ "error": "unable to delete employee details" });
    }
}

const getAllEmployees = async (req, res) => {
    try {
        await connection();
        const employeeList = await employeeModel.find();
        mongoose.disconnect();
        res.status(200).json(employeeList);
    } catch (error) {
        res.status(404).json({ "error": "unable to add employee details" });
    }
}

const getFilteredEmployees = async (req, res) => {
    try {
        const filter = req.body;
        await connection();
        const employeeList = await employeeModel.find(filter);
        mongoose.disconnect();
        res.status(200).json(employeeList);
    } catch (error) {
        res.status(404).json({ "error": "unable to add employee details" });
    }
}

const addUser = async (req, res) => {
    try {
        const user = req.body;
        await connection();
        const userExist = await userModel.find({Name : user.Name})
        if(userExist.length){
            res.status(200).json({ "message": `User with user name ${user.Name} already exist` });
            return;
        }
        const lastInserted = await userModel.find().sort({ UserId: -1}).limit(1);
        user.UserId = 1;
        if(lastInserted.length){
            user.UserId = parseInt(lastInserted[0].UserId, 10) + 1;
        }
        await userModel.create(user);
        res.status(200).json({ "message": "You have successfully registered" });
    } catch (error) {
        console.log("--error", error)
        res.status(404).json({ "error": "unable to add user details" });
    }
}

const validateLogin = async (req, res) => {
    try {
        const user = req.body;
        await connection();
        const isValidUser = await userModel.findOne(user);
        if(isValidUser){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        res.status(404).json({ "error": "unable to validate user login" });
    }
}

module.exports = {
    addEmployee,
    addUser,
    validateLogin,
    getAllEmployees,
    getFilteredEmployees,
    updateEmployee,
    deleteEmployee
}