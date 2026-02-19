const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const PORT = 3000;
const db_users = require('../Routes/users');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const authentication_config = require('./passport_config')
const session = require('express-session');
const NotSoSecretKey = require('../env').NotSoSecretKey
const db_orders = require('../Routes/Orders')
const db_products = require('../Routes/Products')
const db_catagories = require('../Routes/catagories')
const db_cart = require('../Routes/cart')
const { param, body, validationResult} = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true        
    })
);

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));

// setup session
app.use(
    session({
        secret: NotSoSecretKey, 
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false, 
            maxAge: 24 * 60 * 60 * 1000 
        }
    })
);
app.use(passport.initialize());
app.use(passport.session())

// user Authentication 
passport.use(new LocalStrategy({ usernameField: 'email' }, authentication_config.login))
passport.serializeUser((user, done) => {
  done(null,user.email)
});
passport.deserializeUser(authentication_config.findUserByEmail);

app.post('/register', authentication_config.Register);

app.post('/login', passport.authenticate('local', {
    successMessage: "Logged in successfully",
    failureMessage: "Invalid credentials"
}), (req, res) => {
    res.status(200).json({ message: "Logged in!", user: req.user });
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect("/");
    });
});


//default path 
app.get('/', (req, res) => {
    res.send('Ecom API is running')
});


// user paths 
//app.get('/users', authentication_config.isAdmin, db_users.GetUsers);
app.get('/users/:email', param('email').isEmail().trim().escape(), validate, authentication_config.isAdminOrOwner, db_users.getUsersByEmail);
app.get('/checkloggin', db_users.checkLogin)
app.get('/users/check/:email', param('email').isEmail().trim().escape(),validate, db_users.checkuser)
//app.put('/users/update/:email', param('email').trim().escape(), validate, authentication_config.isAdminOrOwner, db_users.updateUserByEmail)
//app.delete('/users/delete/:email', authentication_config.isAdminOrOwner, db_users.deleteUser)


//order paths 
//app.get('/orders', authentication_config.isAdmin, db_orders.allOrders)
app.get("/orders/:id", param('id').trim().escape().isNumeric(),validate, authentication_config.isIDOwner_orders, db_orders.findOrder)
app.post("/orders/neworder", db_orders.newOrder)
//app.delete("/orders/delete/:id", param('id').trim().escape().isNumeric(), validate,authentication_config.isIDOwner_orders, db_orders.deleteOrder)
//app.put("/orders/update/:id", param('id').trim().escape().isNumeric(),validate, authentication_config.isIDOwner_orders, db_orders.updateOrder)

// product paths 
app.get('/product', db_products.getProduct)
app.get('/product/:id', param('id').trim().escape().isNumeric(), validate, db_products.getProductByID)
app.get('/product/search/:searchterm', param('searchterm').trim().escape(), validate, db_products.getProductBySearch)
app.get('/productcatagory/:id', param('id').trim().escape().isNumeric(), validate, db_products.getProdCatByID )
//app.delete('/product/delete/:id', authentication_config.isAdmin, db_products.deleteProductByID)
//app.put('/product/update/:id', param('id').trim().escape().isNumeric(), validate, authentication_config.isAdmin, db_products.updateProductByID)
//app.post('/product/addproduct',  authentication_config.isAdmin,validate, db_products.newProduct)

// Catagories 
app.get('/catagories/name/:name', param('name').trim().escape(), validate, db_catagories.catagoryByName)
app.get('/catagories/product/:id', param('id').trim().escape().isNumeric(), validate, db_catagories.allItemsInCatagory)
app.get('/catagories/top10/:id', param('id').trim().escape().isNumeric(), validate, db_catagories.top10InCat)
app.get('/catagories', db_catagories.allCategories)
//app.put('/catagories/update/:id', param('id').trim().escape().isNumeric(),validate, authentication_config.isAdmin, db_catagories.updateCatagory)
//app.delete('/catagories/delete/:id', param('id').trim().escape().isNumeric(), validate, authentication_config.isAdmin , db_catagories.deleteCatagory)
//app.post('/catagories/product/add', authentication_config.isAdmin , db_catagories.addProductToCategory)
//app.post('/catagories/addcatagory', authentication_config.isAdmin , db_catagories.newCategory)

//cart
app.post('/cart/addproduct', authentication_config.isLoggedIn ,db_cart.addItemTocart)
app.post('/cart/checkout', authentication_config.isLoggedIn, db_cart.checkout)
app.get('/cart', authentication_config.isLoggedIn, db_cart.showCart)
app.get('/cart/clear', authentication_config.isLoggedIn, db_cart.clearcart)


app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`)
});
