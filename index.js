// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  given_date = req.params.date;
  const onlyNumbers = /^\d+$/.test(given_date);

  let unix, utc
  if (onlyNumbers) {
    date_string = parseInt(given_date, 10)
  } else {
    date_string = given_date
  }

  let date = new Date(date_string);
  unix = date.getTime();
  utc = date.toUTCString();
  
  if (utc == 'Invalid Date') {
    res.json({ error : "Invalid Date" })
  } else {
    res.json({ unix, utc });
  }

});

app.get("/api/", function (req, res) {
  let date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({ unix, utc });
  console.log(req.params.date);

});


// listen for requests :)
var listener = app.listen(63574, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
