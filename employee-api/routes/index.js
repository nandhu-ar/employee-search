var express = require('express');
var router = express.Router();
var employee = require('../controller/employee.controller');
var user = require('../controller/user.controller')

router.post('/user', user.validateLogin);

router.put('/user', user.addUser);

router.use(user.authenticateToken);

router.put('/employee', employee.addEmployee);

router.get('/employee', employee.getAllEmployees);

router.patch('/employee', employee.updateEmployee);

router.delete('/employee/:EmployeeId', employee.deleteEmployee);

router.post('/employee' , employee.getFilteredEmployees);

router.all('*', (req, res) => {
  res.status(404).json({"message" : "Invalid Url"})
})


module.exports = router;
