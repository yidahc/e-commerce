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
const { Category } = require('../database-mongo/models/category');
const { Product } = require('../database-mongo/models/product');


const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin')

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


/*
see bottom for response example for following post request
*/

app.post('/api/product/shop',(req,res)=>{

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for(let key in req.body.filters){
      if(req.body.filters[key].length >0 ){
          if(key === 'price'){
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              }
          }else{
              findArgs[key] = req.body.filters[key]
          }
      }
  }

  findArgs['publish'] = true;

  Product.
  find(findArgs).
  populate('brand').
  populate('category').
  sort([[sortBy,order]]).
  skip(skip).
  limit(limit).
  exec((err,articles)=>{
      if(err) return res.status(400).send(err);
      res.status(200).json({
          size: articles.length,
          articles
      })
  })
})



/*
by sold: 
/api/product/articles?sortBy=sold&order=desc&limit=10&skip=5
above query would provide all the top 10 best selling articles, 
in descending order, but skipping the first 5 
(so really 5-10 of best selling articles)
*/

/*
by arrival:
/api/product/articles?sortBy=createdAt&order=desc&limit=4
above query would provide top 4 newest arrivals
*/

app.get('/api/product/articles', (req, res)=>{
// setting defaults to return first 100 articles by id in ascending order
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
// parseInt required since at momento of query the number is converted 
// into a string, so we need to turn it back into a number for mongo to read it as a number
  Product.find().
  populate('brand').
  // automatically populating brand and category with corresponding ObjectId
  populate('category').
  sort([[sortBy, order]]).
  limit(limit).
  exec((err, articles)=>{
      if (err) return res.status(400).send(err);
      res.send(articles)
  })

})

// /api/product/article?id={id1},{id2}&type={array/single}
// api/product/articles_by_id5cea0ac81355d548da92cdea,5cea1001c4509a4ccd9d661c&type=array
app.get('/api/product/articles_by_id', (req, res)=>{
  //we are able to query because we are using bodyParser.urlencoded
  let type = req.query.type;
  let items = req.query.id;
  if(type === "array"){
      let ids = req.query.id.split(',');
      // spliting array of ids in query and seperating by comma
      items = [];
      items = ids.map(item=>{
          return mongoose.Types.ObjectId(item)
          // converting ids to ObjectIDs and pushing them inside of item array
      })
  }
  Product.
  find({'_id':{$in:items}}).
  populate('brand').
  populate('category').
  exec((err, docs)=>{
      return res.status(200).send(docs)
  })
});

app.post('/api/product/article', (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
      if (err) return res.json({success: false, err});
      res.status(200).json({
          success: true, 
          article: doc
      })

  })
})

app.post('/api/product/category', (req, res)=>{
  const category = new Category(req.body);
  category.save((err, doc)=>{
      if( err ) return res.json({success:false, err});
      res.status(200).json({
          success: true,
          category: doc
      })
  })
});

// labiales -> "5cfb46aab2d2232937385048"
// brochas -> "5cfb469fb2d2232937385047"
// rubores -> "5cfb4693b2d2232937385046"
// iluminadores -> "5cfb46ceb2d2232937385049"
// paletas de sombras -> "5cfb46ddb2d223293738504a"

app.get('/api/product/categories', (req, res)=>{
  Category.find({}, (err, category)=>{
      if(err) return res.status(400).send(err);
      res.status(200).send(category)
  })
});

app.post('/api/product/brand', (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json ({success:false, err});
    res.status(200).json({
      success:true,
      brand: doc
    })
  })
});

// Dose Of Colors -> "5cfb477eb2d223293738504b",
// Sigma Beauty -> "5cfb4789b2d223293738504c"
// E.L.F -> "5cfb47a1b2d223293738504d"
// Becca -> "5cfb47b5b2d223293738504e"
// W n' W -> "5cfb47bcb2d223293738504f"

app.get('/api/product/brands', (req, res) =>{
  Brand.find({},(err, brands)=>{
    // mongo premade method to find an instance of a schema
      if(err) return res.status(400).send(err);
      res.status(200).send(brands)
      
  })
});



app.get('/api/users/auth', auth, (req, res) => {
  // auth will find the user by token
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
    // mongo method
    {_id: req.user._id},
    {token: ''},
    // gets rid of the token after log out for security purposes
    (err,doc )=>{
        if(err) {
          console.log(err)
          return res.json({success: false, err});
        }
        return res.status(200).send({
            success: true
        })
    }
  )
});


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
        // generateToken is a method I made on user modal
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

app.post('/api/users/addToCart',auth,(req,res)=>{

  User.findOne({_id: req.user._id},(err,doc)=>{
      let duplicate = false;

      doc.cart.forEach((item)=>{
          if(item.id == req.query.productId){
                duplicate = true;  
          }
      })

      if(duplicate){
          User.findOneAndUpdate(
              {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
              { $inc: { "cart.$.quantity":1 } },
              { new:true },
              ()=>{
                  if(err) return res.json({success:false,err});
                  res.status(200).json(doc.cart)
              }
          )
      } else {
          User.findOneAndUpdate(
              {_id: req.user._id},
              { $push:{ cart:{
                  id: mongoose.Types.ObjectId(req.query.productId),
                  quantity:1,
                  date: Date.now()
              } }},
              { new: true },
              (err,doc)=>{
                  if(err) return res.json({success:false,err});
                  res.status(200).json(doc.cart)
              }
          )
      }
  })
});


app.get('/api/users/removeFromCart',auth,(req,res)=>{

  User.findOneAndUpdate(
      {_id: req.user._id },
      { "$pull":
          { "cart": {"id":mongoose.Types.ObjectId(req.query._id)} }
      },
      { new: true },
      (err,doc)=>{
          let cart = doc.cart;
          let array = cart.map(item=>{
              return mongoose.Types.ObjectId(item.id)
          });

          Product.
          find({'_id':{ $in: array }}).
          populate('brand').
          populate('category').
          exec((err,cartDetail)=>{
              return res.status(200).json({
                  cartDetail,
                  cart
              })
          })
      }
  );
})

app.post('/api/users/successBuy',auth,(req,res)=>{
  let history = [];
  let transactionData = {}

  // user history
  req.body.cartDetail.forEach((item)=>{
      history.push({
          dateOfPurchase: Date.now(),
          name: item.name,
          brand: item.brand.name,
          id: item._id,
          price: item.price,
          quantity: item.quantity,
          paymentId: req.body.paymentData.paymentID
      })
  })

  // PAYMENTS DASH
  transactionData.user = {
      id: req.user._id,
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email
  }
  transactionData.data = req.body.paymentData;
  transactionData.product = history;
      
  User.findOneAndUpdate(
      { _id: req.user._id },
      { $push:{ history:history }, $set:{ cart:[] } },
      { new: true },
      (err,user)=>{
          if(err) return res.json({success:false,err});

          const payment = new Payment(transactionData);
          payment.save((err,doc)=>{
              if(err) return res.json({success:false,err});
              let products = [];
              doc.product.forEach(item=>{
                  products.push({id:item.id,quantity:item.quantity})
               })
            
              async.eachSeries(products,(item,callback)=>{ 
                  Product.update(
                      {_id: item.id},
                      { $inc:{
                          "sold": item.quantity
                      }},
                      {new:false},
                      callback
                  )
              },(err)=>{
                  if(err) return res.json({success:false,err})
                  res.status(200).json({
                      success:true,
                      cart: user.cart,
                      cartDetail:[]
                  })
              })
          });
      }
  )
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'), function(err) {
    if (err) { // renders the corresponding path on the html so the path can render the 
      res.status(500).send(err) // proper component without having to refresh
    }
  })
}); 
// react-router fallback so we can reload without visiting root
// must be bellow all other get requests, because it catches all get requests that start with "/"



module.exports = app;


/*
response from app.post('/api/product/shop',
{
    "size": 4,
    "articles": [
        {
            "_id": "5cfb4f229288292e7153c598",
            "updatedAt": "2019-06-08T06:01:06.351Z",
            "createdAt": "2019-06-08T06:01:06.351Z",
            "name": "Mini Duo Iluminadores - Tono Opal",
            "description": "Mejora tus características con el resplador del iluminador en tono Opal ahora en su presentación de viaje 'Glow on The Go'. En presentaciones líquida y en polvo garantizarás un brillo sin igual y un maquillaje luminiscente que te permitirá construir el resultado según elijas que intensidad brindar a tu look.",
            "price": 660,
            "brand": {
                "_id": "5cfb47b5b2d223293738504e",
                "name": "Becca",
                "__v": 0
            },
            "available": true,
            "category": {
                "_id": "5cfb46ceb2d2232937385049",
                "name": "iluminadores",
                "__v": 0
            },
            "publish": true,
            "__v": 0,
            "images": [
                "BeccaDuoOpal.jpg"
            ],
            "sold": 0,
            "shipping": true
        },
        {
            "_id": "5cfb4cbd9288292e7153c597",
            "updatedAt": "2019-06-08T05:50:53.989Z",
            "createdAt": "2019-06-08T05:50:53.989Z",
            "name": "Sigmax Kabuki Brush Kit",
            "description": "Set de 5 brochas kabuki para pulir y difuminar cualquier producto en líquido, polvo o crema. Hechas de fibras sigmax hipoalergenicas",
            "price": 2500,
            "brand": {
                "_id": "5cfb4789b2d223293738504c",
                "name": "Sigma Beauty",
                "__v": 0
            },
            "available": true,
            "category": {
                "_id": "5cfb469fb2d2232937385047",
                "name": "brochas",
                "__v": 0
            },
            "publish": true,
            "__v": 0,
            "images": [
                "SigmaKabuki5Set.jpg"
            ],
            "sold": 0,
            "shipping": true
        },
        {
            "_id": "5cfb4ae39288292e7153c596",
            "updatedAt": "2019-06-08T05:42:59.242Z",
            "createdAt": "2019-06-08T05:42:59.242Z",
            "name": "Brocha Sigma F64 Soft Blend Concealer",
            "description": "Para pulir y aplicar corrector ligero en áreas amplias o para aplicar un acabado completo en el rostro (18.89 cm).",
            "price": 320,
            "brand": {
                "_id": "5cfb4789b2d223293738504c",
                "name": "Sigma Beauty",
                "__v": 0
            },
            "available": true,
            "category": {
                "_id": "5cfb469fb2d2232937385047",
                "name": "brochas",
                "__v": 0
            },
            "publish": true,
            "__v": 0,
            "images": [
                "Sigmaf64.jpg"
            ],
            "sold": 0,
            "shipping": true
        },
        {
            "_id": "5cfb4aa49288292e7153c595",
            "updatedAt": "2019-06-08T05:41:56.758Z",
            "createdAt": "2019-06-08T05:41:56.758Z",
            "name": "Labial Liquido Mate - Tono Fresa",
            "description": "Matte Liquid Lipsticks de Dose Of Colors. Un lipstick que brinda una increíble textura mate aterciopelada.Se aplica en forma líquida y al secar crea labios súper besables que atraparán todas las miradas. Tono Fresa",
            "price": 350,
            "brand": {
                "_id": "5cfb477eb2d223293738504b",
                "name": "Dose Of Colors",
                "__v": 0
            },
            "available": true,
            "category": {
                "_id": "5cfb46aab2d2232937385048",
                "name": "labiales",
                "__v": 0
            },
            "publish": true,
            "__v": 0,
            "images": [
                "DOCfresa.jpg"
            ],
            "sold": 0,
            "shipping": true
        }
    ]
}
*/