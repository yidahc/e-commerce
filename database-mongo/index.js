var mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

const bcrypt = require('bcrypt');
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1
    },
    password: {
      type: String,
      required: true,
      minLength: 5
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
      default: 0
    },
    token: {
      type: Number
    }
  });
  
  userSchema.pre('save', function(next){
    var user = this; //es5 requires us to specify what 'this' is since it is not automatically 
    //bound at runtime
    bcrypt.genSalt(SALT_I, function(err, salt){
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash){ //with es6, one would write "this.password"
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  })

  const User = mongoose.model('User', userSchema);
  module.exports= { User }
  