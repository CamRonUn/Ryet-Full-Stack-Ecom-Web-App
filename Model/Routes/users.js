const {pool} = require('../DB/index');
const bcrypt = require('bcrypt')

const GetUsers = async (req, res) => {
    pool.query('SELECT * FROM USERS', (error, results) => {
            if (error){
                throw error
            }
            res.status(200).json(results.rows)
        })
    };

const getUsersByEmail= async (req,res) => {
    const {email} = req.params
    pool.query('SELECT * FROM USERS WHERE email = $1', [email] , (error, results) => {
            if (error){
                throw error
            }
            res.status(200).json(results.rows)
        })
}

const updateUserByEmail = async (req, res) => {
    const {email} = req.params;
    const allowed_updates = ['first_name', 'last_name', 'date_of_birth', 'phone', 'language']
    const keys = Object.keys(req.body);
    const is_valid_update = keys.every(key => allowed_updates.includes(key))
    const values = Object.values(req.body);

    if (!is_valid_update) {
    return res.status(400).json({ error: 'Invalid updates! One or more fields are not allowed.' });
    }

    if (keys.length === 0) {
        return res.status(400).json({ message: "Nothing to update" });
    }


    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    values.push(email);
    const emailPosition = values.length;

    const queryText = `UPDATE users SET ${setClause} WHERE email = $${emailPosition}`;

    try {
        await pool.query(queryText, values);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUser = async (req,res) => {
    const {email} = req.body 

    try{
    const user = await pool.query('SELECT * FROM USERS WHERE email = $1', [email]);
    if (user.rows.length === 0){ 
        res.status(400).json({message: "user does not exist"})
    }
        await pool.query('DELETE FROM users WHERE email = $1', [email])
        res.status(200).json({message: "succusfully deleted"})
    } catch (error){
        console.error(error)
        res.status(500).json({error: "error"})
    }
}

const checkLogin = (req,res) => {
    if (req.user) {
        res.status(200).json({user: true})
    } else {
        res.status(200).json({user: false})
    }
}

const checkuser = async (req,res) => {
    try {
        const {email} = req.params
        const users = await pool.query('SELECT email FROM Users Where email = $1', [email]);
        if (users.rows.length > 0) {
            res.status(200).json({user: true})
        } else {
            res.status(200).json({user: false})
        }
    } catch (e) {
        throw (e)
    }
}

const getCurrentUser = async (req,res) => {
    if (req.user) {
        const user = req.user
        res.status(200).json({email: user.email, first_name: user.first_name, last_name: user.last_name})
    } else {
        res.status(404).json({message: "user not found"})
    }
}

const googleUser = async (googleID, email, fname, lname) => { 

    const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",[email]
    );

    if (existingUser.rows.length > 0 && !existingUser.rows[0].google_id) {
        return false
    }

    const result = await pool.query("SELECT * FROM USERS WHERE google_id = $1", [googleID])
    let user = result.rows[0];


    if (!user) {
        const insertResult = await pool.query("INSERT INTO users(email, first_name, last_name, role, google_id) VALUES($1, $2, $3,'customer', $4) RETURNING *",[email,fname,lname,googleID])
        user = insertResult.rows[0]
        const idResult = await pool.query("SELECT ID FROM cart ORDER BY ID DESC LIMIT 1");
        const id = idResult.rows.length > 0 ? idResult.rows[0].id + 1 : 1;
        const newCart = await pool.query(
            'INSERT INTO cart Values($1, $2)', [id, email]
        )
    } 

    return user;
}

module.exports = {
    GetUsers,
    getUsersByEmail,
    updateUserByEmail, 
    deleteUser, 
    checkLogin,
    checkuser, 
    getCurrentUser,
    googleUser
}