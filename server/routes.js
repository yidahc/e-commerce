const db = require('../database-mysql/index.js');
const path = require('path');
const { User } = require('../database-mongo');

module.exports.fallback = (req, res) => {
    res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), function(err) {
      if (err) { // renders the corresponding path on the html so the path can render the 
        res.status(500).send(err) // proper component without having to refresh
      }
    })
};

module.exports.getUser = (req, res)=>{
  const user = new User(req.body) // returns a new user with parameters from database
  user.save((err,doc)=>{ // doc is the response from the server with all user data in an object
    if (err) return res.json({success:false,err});
    res.status(200).json({
        success: true,
        userdata: doc
    })
  })
}

module.exports.getItems = (req, res) => {
    db.selectAll(function(err, data) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(data);
      }
    });
}