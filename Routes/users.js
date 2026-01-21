const {pool} = require('../DB/index');


const GetUsers = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM USERS', (error, results) => {
            if (error){
                throw error
            }
            res.status(200).json(results.rows)
        })
    }


module.exports = {
    GetUsers
}