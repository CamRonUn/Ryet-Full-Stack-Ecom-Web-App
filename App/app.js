const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;
const db_users = require('../Routes/users');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const authentication_config = require('./passport_config')
const session = require('express-session');
const NotSoSecretKey = require('../env').NotSoSecretKey

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true        
    })
);

// setup session
app.use(
    session({
        secret: NotSoSecretKey, 
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false, 
            maxAge: 1000 * 60 * 60 * 24 
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

app.get('/', (req, res) => {
    res.send('Ecom API is running')
});
 
app.get('/users', authentication_config.isAdmin, db_users.GetUsers);
app.get('/users/:email', authentication_config.isAdminOrOwner, db_users.getUsersByEmail);
app.put('/users/update/:email', authentication_config.isAdminOrOwner, db_users.updateUserByEmail)

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`)
});
