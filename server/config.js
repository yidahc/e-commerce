const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')

const app = express();

require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

const path = require('path');
const { User } = require('../database-mongo/models/user');
const { Brand } = require('../database-mongo/models/brand');
const { Category } = require('./models/category');


const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin')

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.post('/api/product/category', auth, admin, (req, res)=>{
  const category = new Category(req.body);
  category.save((err, doc)=>{
      if( err ) return res.json({success:false, err});
      res.status(200).json({
          success: true,
          category: doc
      })
  })
})

app.get('/api/product/category', (req, res)=>{
  Category.find({}, (err, category)=>{
      if(err) return res.status(400).send(err);
      res.status(200).send(category)
  })
})

app.post('/api/product/brand', auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json ({success:false, err});
    res.status(200).json({
      success:true,
      brand: doc
    })
  })
});

app.get('/api/product/brands', (req, res) =>{
  Brand.find({},(err, brands)=>{
      if(err) return res.status(400).send(err);
      res.status(200).send(brands)
      
  })
});



app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    //user: req.user <-- all req 
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  })
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    {_id: req.user._id},
    {token: ''},
    (err,doc )=>{
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    }
  )
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), function(err) {
    if (err) { // renders the corresponding path on the html so the path can render the 
      res.status(500).send(err) // proper component without having to refresh
    }
  })
}); 
// react-router fallback so we can reload without visiting root
// must be bellow all other get requests, because it catches all get requests that start with "/"

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body) // returns a new user with parameters from database
  user.save((err,doc)=>{ // doc is the response from the server with all user data in an object
    if (err) return res.json({success:false,err});
    res.status(200).json({
        success: true, 
        userdata: doc
    })
  })
}); 
// generates new user for every post request when creating a new account 

app.post('/api/users/login', (req, res) => {
  User.findOne({'email':req.body.email}, (err, user)=>{ 
 //findOne is a method from mongo that will return either the specified user or null
    if (!user) return res.json({loginSuccess:false, message:'Auth failed, email not found'})
    // User refers to the constructor from database, 
    // user refers to a specific instance (specific user trying to login)
    user.comparePassword(req.body.password, (err, isMatch)=>{
    // compare Password is a mongo method created in the User model
      if (!isMatch) return res.json({loginSuccess:false, message:'Wrong password'});
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('y_auth', user.token).status(200).json({ 
        // storing token as a cookie (not local storage)
        // after user logs out, cookie remains however the token is no longer valid (everything is hashed)
          loginSuccess: true
        })
      
      })

    })
  })
}); 

module.exports = app;