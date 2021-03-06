"use strict";

// Band Ids
//const bandId = 1; //Phish
//const bandId = 2; //WSP
//const bandId = 3; //SCI
const bandId = 4; //tDB
//const bandId = 9; //UM

// PT Web Address
const ptURL = 'https://www.phantasytour.com';

// Local Modules
let express = require('express');
let router = express.Router();
let request = require('request');

//------------------------------------ Common Header ---------------------------------------------//

let options = {
    headers: { 'Accept': 'application/json' }
}

//------------------------------------ Routes ---------------------------------------------//

// root
router.get('/', function(req, res, next) {
    res.render('index.html');
});

// Returns all songs
router.get('/songs', function(req, res, next) {
    options.url = ptURL + '/api/songs?bandId=' + bandId + '&fields=Name,Cover,Id';
    request(options, (err, response, html) => {
        if (err) { console.log(`Error : ${err}`); }
        if (html) { 
            return res.send(html);
        }
        //if (response) { return res.send(response); }
    });
});

// Returns all venues played
router.get('/venues', function(req, res, next) {
    options.url = ptURL + '/api/bands/' + bandId + '/venues';
    request(options, (err, response, html) => {
        if (err) {console.log(`Error : ${err}`); }
        if (html) { 
            const data = JSON.parse(html);
            return res.send(data.map(venue => venue.name)); 
        }
        //if (response) { return res.send(response); }
    });
});

// Returns all cities visited
router.get('/locales', function(req, res, next) {
    options.url = ptURL + '/api/bands/' + bandId + '/locales';
    request(options, (err, response, html) => {
        if (err) {console.log(`Error : ${err}`); }
        if (html) { 
            const data = JSON.parse(html);
            return res.send(data.map(locale => locale.id)); 
        }
        //if (response) { return res.send(response); }
    });
});

// returns a number of shows for a given city/locale
router.get('/locale', function(req, res, next) {
    options.url = ptURL + '/api/bands/' + bandId + '/setlists/paged?page=1&pageSize=' + req.query.shows + '&timespan=past&locale=' + req.query.locale;
    request(options, (err, response, html) => {
        if (err) {console.log(`Error : ${err}`); }
        if (html) { 
            return res.send(JSON.parse(html));
        }
        //if (response) { return res.send(response); }
    });
});

// Returns a number of previous shows for the given value
router.get('/previous', function(req, res, next) {
    options.url = ptURL + '/api/bands/' + bandId + '/setlists/paged?page=1&pageSize=' + req.query.shows + '&timespan=past';
    request(options, (err, response, html) => {
        if (err) {console.log(`Error : ${err}`); }
        if (html) { 
            return res.send(JSON.parse(html));
        }
        //if (response) { return res.send(response); }
    });
});

module.exports = router;