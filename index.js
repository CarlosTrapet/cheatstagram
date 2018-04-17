var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.end()  
});

module.exports = app;
