// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var router      = express.Router(); 
//var Product     = require('./server/models/product');

var mongodbConnectionString = 'mongodb://localhost:27017/onlineshopdb';

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodbConnectionString = process.env.OPENSHIFT_MONGODB_DB_URL + 'nodejs';
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//mongoose.connect(mongodbConnectionString);

// ROUTES FOR OUR API
// =============================================================================
//var ProductsRouter = require('./products-router');

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('a');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next(); // make sure we go to the next routes and don't stop here
});
router.get('/', function (req, res) {
  res.send('hello');
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
//app.use('/api/products', ProductsRouter);

// START THE SERVER
// =============================================================================
app.listen(serverPort, serverIpAddress, function () {
  console.log( "Listening on " + serverPort + ", port " + serverIpAddress )
});