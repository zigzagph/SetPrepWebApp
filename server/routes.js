"use strict";
var express = require('express');
var router = express.Router();

//------------------------------------ Routes ---------------------------------------------//

// root
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/servers', function(req, res, next) {
    //res.send(nexiaAddressArray);
});

module.exports = router;