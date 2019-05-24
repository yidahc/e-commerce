const db = require('../database-mysql/index.js');
const path = require('path');
const { User } = require('../database-mongo/models/user');

module.exports.getAuth = (req, res) => {
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
};

module.exports.logOut = (req, res) => {
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
}

module.exports.fallback = (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), function(err) {
    if (err) { // renders the corresponding path on the html so the path can render the 
      res.status(500).send(err) // proper component without having to refresh
    }
  })
};

module.exports.postUser = (req, res) => {
  const user = new User(req.body) // returns a new user with parameters from database
  user.save((err,doc)=>{ // doc is the response from the server with all user data in an object
    if (err) return res.json({success:false,err});
    res.status(200).json({
        success: true, 
        userdata: doc
    })
  })
}

module.exports.postLogin = (req, res) => {
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
}
