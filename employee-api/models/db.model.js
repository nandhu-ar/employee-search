const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    EmployeeId: Number,
    Name: String,
    EmailId: String,
    Age: Number,
    Address: String,
    MobileNumber: Number
})

const employeeModel = mongoose.model('Employee', employeeSchema);


const userSchema = new mongoose.Schema({
    UserId: Number,
    Name: String,
    Password: String,
    EmailId: String,
})

const userModel = mongoose.model('User', userSchema);

module.exports = {
    employeeModel,
    userModel
}