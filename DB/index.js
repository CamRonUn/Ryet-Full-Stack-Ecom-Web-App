const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'ecom_api',
    password: 'password',
    port: 5432,
});

module.exports = {pool}




