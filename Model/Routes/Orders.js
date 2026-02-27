const {pool} = require('../DB/index');

const newOrder = async (req,res) => {
    const {shipping_price, street_address, city, country} = req.body 
    const today = new Date()
    const date = today.toISOString().slice(0,10)
    if(!req.user){
        res.status(400).json({message: "login to create an order"})
    }
    const User_email = req.user.email
    try {
        const id = (await pool.query("SELECT ID FROM ORDERS ORDER BY ID DESC LIMIT 1")).rows[0].id + 1
        await pool.query("INSERT INTO Orders VALUES ($1, $2, $3, $4, $5, $6, $7)", [id, date, shipping_price, User_email, street_address, city, country])
        res.status(201).json({message: 'Order made Succusfully'})
    }catch (error){
        res.status(500).json({error: error.message})
    }
}

const deleteOrder = async (req,res) => {
    const {id} = req.params 

    try{
        const order = await pool.query('SELECT * FROM orders WHERE ID = $1', [id]);
        if (order.rows.length === 0){
            res.status(404).json({message: "Order Not Found"})
        }
        await pool.query('DELETE FROM orders WHERE id = $1', [id]);
        res.status(200).json({message: "succusfully deleted"})
    } catch (error){
        console.error(error)
        res.status(500).json({error: "error"})
    }
}

const updateOrder = async (req,res) => {
    const {id} = req.params
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    const valid_changes = ["shipping_price", "street_address", "city", "country"]
    const changes_are_valid = keys.every(key => valid_changes.includes(key))
    if (!changes_are_valid){
        res.status(403).json({message: "One or more fields are invalid or restricted"})
    }

    if (keys.length === 0) {
        return res.status(400).json({ message: "Nothing to update" });
    }


    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    console.log(setClause)
    values.push(id);
    const idPosition = values.length;

    const queryText = `UPDATE Orders SET ${setClause} WHERE id = $${idPosition}`;


    try{
        const order = await pool.query('SELECT * FROM orders WHERE ID = $1', [id]);
        if (order.rows.length === 0){
            res.status(404).json({message: "Order Not Found"})
        }
        await pool.query(queryText, values);
        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const findOrder = (req,res) => {
    const {id} = req.params 
    pool.query('SELECT * FROM ORDERS WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const allOrders = (req,res) => {
    pool.query('SELECT * FROM ORDERS', (error, results) => {
         if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const usersOrders = async (req,res) => {
    const user = req.user
    const email = user.email
    if (!email) {
        res.status(404).json({message:"user not found"})
    }
    try {
        const orders = await pool.query("SELECT * FROM ORDERS WHERE user_email = $1", [email])
        res.status(200).json(orders.rows)
    } catch (err) {
        res.status(500).json({message: "error getting orders"})
        throw (err)
    }
}

const top3productPhotos = async(req, res) => {
    const {id} = req.params 

    try {
        const data = await pool.query('SELECT P.IMAGE as "image" FROM Orders_product AS OP, product AS P WHERE OP.product_id = P.id AND OP.orders_id  = $1 order BY p.ID LIMIT 3', [id])
        res.status(200).json(data.rows)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const ordersTotalPrice = async(req, res) => {
    const {id} = req.params
    if (!req.user) {
        res.status(400).json({message: "Must Be logged in to acess order Info 1"})
    }

    const {email} = req.user
    

    try {
        const userCheck = await pool.query('SELECT user_email FROM orders WHERE id = $1', [id])
        if (userCheck.rows[0].user_email !== email) {
            res.status(400).json({message: "Must Be logged in to acess order Info 2"})
        }
        const data = await pool.query("SELECT (sum(p.price) + (SELECT shipping_price from orders where id =$1)) AS total FROM orders AS O, orders_product AS OP, product AS p WHERE OP.orders_id = O.id AND OP.product_id = P.id AND O.id = $1", [id])
        res.status(200).json(data.rows)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

const viewOrder = async (req,res) => {
    const user = req.user
    const {id} = req.params
    try {
        const orderUserEmail = await pool.query('SELECT user_email From Orders WHERE id = $1', [id])
        if (orderUserEmail.rows[0].user_email === user.email) {
            const data = await pool.query('SELECT P.name as "name", P.price AS price, P.id AS "product_id", p.image as "image", p.aliexpress_link as "Link", O.date AS "Date" FROM ORDERS AS O, ORDERS_product AS OP, Product AS P WHERE O.id = $1 AND O.id = OP.orders_id AND OP.product_id = P.id', [id])
            res.status(200).json({data: data.rows, doesNotOwn: false})
        } else {
            res.status(400).json({message: "log in to get user data"})
        }
    } catch (err) {
        res.status(500).json({doesNotOwn: true})
    }
}

module.exports = {
    newOrder, 
    deleteOrder,
    updateOrder,
    findOrder,
    allOrders,
    usersOrders,
    top3productPhotos,
    ordersTotalPrice,
    viewOrder
}