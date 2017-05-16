var express = require('express');
var app = express();

//console.log(__dirname);
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
