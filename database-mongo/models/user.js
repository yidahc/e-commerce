const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // used to hash passwords
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1 // only one user per email, 1 is for true
    },
    password: {
      type: String,
      required: true,
      minLength: 5 // password must be a string at least 5 characters long and is required
    },
    name: {
      type: String,
      required: true,
      maxLength: 100
    },
    lastname: {
      type: String,
      required: true,
      maxLength: 100
    },
    cart: {
      type:Array,
      default:[]
    },
    history: {
      type:Array,
      default:[] 
    },
    role: {
      type: Number,
      default: 0 // either you are an administrator or a user, 0 is for user
    },
    token: {
      type: Number
    }
  });
  
  userSchema.pre('save', function(next){ // next is function in server/config that will run after this function
    var user = this; //es5 requires us to specify what 'this' is since it is not automatically 
    //bound at runtime
    bcrypt.genSalt(SALT_I, function(err, salt){ // generating hash for user password
      if (err) return next(err); // if error, continue to next function with err as parameter
      bcrypt.hash(user.password, salt, function(err, hash){ //with es6, one would write "this.password"
        if (err) return next(err); // next function will return "success: false"
        user.password = hash; // generating hash for user password
        next(); // continue to next function
      });
    });
  })

  const User = mongoose.model('User', userSchema);
  module.exports= { User }
  