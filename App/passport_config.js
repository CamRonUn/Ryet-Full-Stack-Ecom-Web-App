const {pool} = require('../DB/index');
const passport = require('passport');
const bcrypt = require('bcrypt');

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidSqlDate(dateString) {
  const dateObject = new Date(dateString);
  return dateObject instanceof Date && !isNaN(dateObject);
}

function containsNumber(str) {
  return /\d/.test(str);
}

const login = async (username, password, done) => {
    try {
        const results = await pool.query('SELECT * FROM Users WHERE email = $1', [username]);
        const user = results.rows[0];

        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.passwords) {
            return done(null, false, { message: 'Please log in with Google.' });
        }

        const isMatched = await bcrypt.compare(password, user.passwords);
        if (!isMatched) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
};


const Register = async(req, res) => {
    const {email, password, first_name, last_name, phone, DOB } = req.body
    try {
        const userExists = await pool.query('SELECT * FROM USERS WHERE email = $1', [email]);
        if (userExists.rows.length > 0){
            return res.status(400).json({message: 'User already exists'})
        }

        if (!validateEmail(email) ){
            return res.status(400).json({message: 'Invalid Email Address'})
        }

        if(!isValidSqlDate(DOB)){
            return res.status(400).json({message: 'Invalid DOB'})
        }

        
        if (password.length <= 8){
            return res.status(400).json({message: 'Password must be greater than 8 characters'})
        }

        if (!containsNumber(password)){
            return res.status(400).json({message: 'Password must contain at least 1 number'})
        }


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            'INSERT INTO USERS (EMAIL, passwords, First_name, Last_name, Phone, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING EMAIL, First_name, role',
            [email, hashedPassword, first_name, last_name, phone, DOB]);

        res.status(201).json(newUser.rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}


const authorize = (requiredRole) => {
    return (req,res, next) => {
        if (req.user.role !== requiredRole){
            return res.status(403).json({ message: "UnAuthorised" });
        } 
        next();
    }
}

const findUserByEmail = async (email, done) => {
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]); 
        const user = users.rows[0]

        done(null,user || false);
    }catch (err) {
        done(err)
    }
}  


const isAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ message: "Please log in to continue." });
    }
    if (req.user && req.user.role === 'admin') {
        return next()
    } 
    res.status(403).json({ message: "Access denied. Admins only." });
}

const isOwner = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({ message: "Please log in to continue." });
    }
    if (req.params.email === req.user.email){
        return next()
    }
    res.status(403).json({ message: "Acess denied. You can only acess your own data."})
}

const isAdminOrOwner = (req,res,next) => {
    if(!req.user){
        return res.status(401).json({ message: "Please log in to continue." });
    }
    if (req.user.role === 'admin' || req.params.email === req.user.email){
        return next()
    }
    res.status(403).json({ message: "Acess denied. You can only acess your own data."})
    
}

const isIDOwner_orders = async (req,res,next) => {
    const {id} = req.params
    if(!req.user){
    return res.status(401).json({ message: "Please log in to continue." });
    }
    try {
        const email = await pool.query('SELECT user_email FROM orders WHERE id = $1', [id])
        if (email.rows.length === 0){
            res.status(404).json({message: "order not found"})
        }
        if (email.rows[0].user_email === req.user.email){
            return next()
        }
        if (req.user.role === "admin"){
            return next()
        }
        res.status(400).json({message: "you can only acess your orders"})
    } catch (error){
        res.status(500).json({error: error.error})
    }
}

module.exports = {
    Register,
    authorize,
    login,
    findUserByEmail,
    isAdmin, 
    isOwner,
    isAdminOrOwner,
    isIDOwner_orders
}