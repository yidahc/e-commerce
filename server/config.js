var express = require('express');
var bodyParser = require('body-parser');
const compression = require('compression');
const route = require('../server/routes.js')
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const app = express();
// var items = require('../database-mongo');

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// react-router fallback so we can reload without visiting root

app.get('/*', route.fallback);

app.get('/items', route.getItems);

module.exports = app;