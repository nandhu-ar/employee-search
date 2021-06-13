var express = require('express');
var router = express.Router();
var employee = require('../controller/employee.controller');
var user = require('../controller/user.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/employee', employee.addEmployee);

router.get('/employee', employee.getAllEmployees);

router.patch('/employee', employee.updateEmployee);

router.delete('/employee/:EmployeeId', employee.deleteEmployee);

router.post('/employee' , employee.getFilteredEmployees);

router.put('/user', user.addUser);

router.post('/user', user.validateLogin);

module.exports = router;
