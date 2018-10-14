var request = require('request');

//const url = 'https://www.phantasytour.com/api/songs?bandId=4&fields=Id,Name';
//const url = 'https://www.phantasytour.com/api/songs/?bandId=4';
const url = 'https://www.phantasytour.com/api/bands/4/venues';
//const url = 'https://www.phantasytour.com';
//const url = 'https://www.google.com';

/* request(url, function(err, response, html) {
    if (err) {console.log(`Error : ${err}`); }
    if (response) {
        console.log("Response");
        //console.log(response);
        //res.send(response);
    }
    if (html) {
        console.log("HTML");
        console.log(html);
        //res.send(html);
    }
}); */



/* var request = require("request");

var options = { method: 'GET',
  url: 'https://www.phantasytour.com/api/songs',
  qs: { bandId: '4', fields: 'Id,Name' },
  headers: 
   { 'Postman-Token': 'b4854d93-5d76-48d0-b5b2-1d0419f26955',
     'Cache-Control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  if (response) {
      console.log("Response");
      console.log(response);
  }

  console.log(body);
}); */


/* var https = require('https');

var options = {
    host: 'www.phantasytour.com',
    port: 443,
    path: '/api/songs?bandId=4&fields=Id,Name',
    method: 'GET'
};
  
var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
  
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
  
// write data to request body
req.write('data\n');
req.write('data\n');
req.end(); */


const curl = new (require( 'curl-request' ))();
 
curl.setHeaders([
    //'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
])
.get(url)
.then(({statusCode, body, headers}) => {
    console.log(statusCode, body, headers)
})
.catch((e) => {
    console.log(e);
});





// THIS WORKS
/* var Curl = require('node-libcurl').Curl;
var curl = new Curl();
curl.setOpt('URL', url);
//curl.setOpt('FOLLOWLOCATION', true);
curl.on('end', function(statusCode, body, headers) {
    console.info(statusCode);
    console.info('---');
    console.info(body.length);
    console.info('---');
    console.info(this.getInfo( 'TOTAL_TIME'));
    console.log(body);
    this.close();
});
curl.on('error', curl.close.bind(curl));
curl.perform(); */





console.log("Poop");
