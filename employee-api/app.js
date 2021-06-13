var express = require('express');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index.js');
var cors = require('cors');
var port = 8080;
var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = app;
