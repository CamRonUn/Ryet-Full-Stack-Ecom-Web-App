const {pool} = require('../DB/index');
const passport = require('passport');
const bcrypt = require('bcrypt');

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
    const {email, password, first_name, last_name, phone } = req.body

    try {
        const userExists = await pool.query('SELECT * FROM USERS WHERE email = $1', [email]);
        if (userExists.rows.length > 0){
            return res.status(400).json({message: 'User already exists'})
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            'INSERT INTO USERS (EMAIL, passwords, First_name, Last_name, Phone) VALUES ($1, $2, $3, $4, $5) RETURNING EMAIL, First_name, role',
            [email, hashedPassword, first_name, last_name, phone]);

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



module.exports = {
    Register,
    authorize,
    login,
    findUserByEmail
}