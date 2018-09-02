"use strict";
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();

/* ----------------------------- CORS ----------------------------- */

/* app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(cors()); */

//---------------------------------------------------------------------------------//
// The following section listens on port 3000 for http requests. These can be API
// calls or HTML requests. 

// Set Static Folder (angular stuff)
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create Routes
let routes = require('./routes');
app.use('/', routes);

app.listen(3000, function () {
	console.log('App server listening on port 3000.');
});

module.exports = app; 