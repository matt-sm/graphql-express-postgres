var express = require('express');  
var app = express();  
var db  = require('./db');

var port = 4000;

app.listen(port);  
console.log("Listening on port", port);  