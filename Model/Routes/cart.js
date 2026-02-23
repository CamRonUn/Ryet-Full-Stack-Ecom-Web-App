const {pool} = require('../DB/index');
const db_orders = require('./Orders')

const addProductToOrder = async (req, res) => {
    const { product_id, order_id } = req.body;
    try {
        await pool.query("INSERT INTO ORDERS_PRODUCT (Product_ID, Orders_ID) VALUES ($1, $2)", [product_id, order_id]);
        res.status(201).json({ message: "Product added to Order" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addItemTocart = async (req,res) =>{
    const {email}= req.user
    const {item_id} = req.body
    try{
        const idResult = await pool.query("SELECT ID FROM cart_product ORDER BY ID DESC LIMIT 1");
        const id = idResult.rows.length > 0 ? idResult.rows[0].id + 1 : 1;
        const findcartid = await pool.query('SELECT id FROM cart WHERE user_email = $1', [email])
        const cartid = findcartid.rows[0].id
        await pool.query('INSERT INTO cart_product VALUES ($1, $2, $3)', [id, cartid, item_id]) 
        res.status(200).json({message: "item added to cart"})
    } catch(error){
        console.error(error)
        res.status(500).json({error: error})
    }
    }

const clearcart = async (req, res) => {
    const {email}= req.user 
    try{
        const findcartid = await pool.query('SELECT id FROM cart WHERE user_email = $1', [email])
        const cartid = findcartid.rows[0].id
        pool.query('Delete FROM cart_product WHERE cart_id = $1', [cartid])
        res.status(200).json({message: "cart cleared"})
    } catch(error){
        console.error(error)
        res.status(500).json({error: error})
    }
}

const showCart = async (req,res) => {
    const {email}= req.user 
    try{
        const findcartid = await pool.query('SELECT id FROM cart WHERE user_email = $1', [email])
        const cartid = findcartid.rows[0].id
        const cart = await pool.query('SELECT PC.cart_id AS "Cart ID", P.id AS "Product ID", P.name AS "Product", P.Price as "Price", P.image AS "image" FROM cart_product AS PC JOIN Product AS P ON PC.product_id = P.ID WHERE PC.cart_id = $1', [cartid])
        res.status(200).json({cart: cart.rows})
    } catch(error){
        console.error(error)
        res.status(500).json({error: error})
    }
}

const checkout = async (req,res) => {
    const {email}= req.user 
    const {shipping_price, street_address, city, country} = req.body 
    const today = new Date()
    const date = today.toISOString().slice(0,10)
    try{
        //find cart 
        const findcartid = await pool.query('SELECT id FROM cart WHERE user_email = $1', [email])
        const cartid = findcartid.rows[0].id

        //create order
        const idResult = await pool.query("SELECT ID FROM orders ORDER BY ID DESC LIMIT 1");
        const order_id = idResult.rows.length > 0 ? idResult.rows[0].id + 1 : 1;
        await pool.query("INSERT INTO Orders VALUES ($1, $2, $3, $4, $5, $6, $7)", [order_id, date, shipping_price, email, street_address, city, country])

        //add items to order
        const cart = await pool.query('SELECT * FROM cart_product WHERE cart_id = $1 ORDER BY ID DESC', [cartid])
        for (i = 0; i < cart.rows.length; i++){
            const item_idResult = await pool.query("SELECT ID FROM orders_product ORDER BY ID DESC LIMIT 1");
            const item_order_id = item_idResult.rows.length > 0 ? item_idResult.rows[0].id + 1 : 1;
            await pool.query('INSERT INTO orders_Product VALUES ($1, $2, $3)', [item_order_id, cart.rows[i].product_id, order_id])
        }

        // clear cart
        await pool.query('Delete FROM cart_product WHERE cart_id = $1', [cartid])
        res.status(200).json({message: "Order Made"})
    } catch(error){
        console.error(error)
        res.status(500).json({error: error})
    }
}

module.exports = {
    addItemTocart,
    clearcart,
    showCart,
    checkout,
    addProductToOrder
}
