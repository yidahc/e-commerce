const { User } = require('../../database-mongo/models/user');

let auth = (req, res, next) => {
  let token = req.cookies.y_auth;
  User.findByToken(token, (err,user) => {
      if (err) throw err;
      if (!user) return res.json({
    // if there is no user, then findByToken determines this user is not authorized 
          isAuth:false,
          error: true
      });
      req.token = token;
      req.user = user; // adding token and user data to the request
      next();
  })
} 

module.exports = { auth }