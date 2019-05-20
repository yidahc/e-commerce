var express = require('express');
var bodyParser = require('body-parser');
const compression = require('compression');
const route = require('../server/routes.js')
const cookieParser = require('cookie-parser')

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/*', route.fallback); 
// react-router fallback so we can reload without visiting root

//app.get('/api/users/auth', route.getAuth);

app.post('/api/users/register', route.postUser); 
// generates new user for every post request when creating a new account 

app.post('/api/users/login', route.postLogin); 

module.exports = app;