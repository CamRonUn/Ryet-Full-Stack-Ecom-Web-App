const stripe = require('stripe')(process.env.STRIPEKEY);
const {pool} = require('../DB/index');

const createPaymentIntent = async (req, res) => {
    if(!req.user){
        res.status(500).json({url: `${process.env.CLIENT_URL}`})
    }
    const {email} = req.user

    const cartData = await pool.query("Select P.id AS id, P.name as name, P.Price AS price FROM product AS P, cart_product AS PC, cart AS C WHERE C.id = PC.cart_ID AND PC.product_id = P.id AND C.user_email = $1", [email])
    const cartItems = cartData.rows
    
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map(item => ({
      price_data: {
        currency: 'cny',
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Amount in cents
      },
      quantity: 1,
    })
    ),
    mode: 'payment',
    metadata: {
    productIds: JSON.stringify(cartItems.map(item => item.id)),
    userEmail: email
    },
    shipping_address_collection: {
        allowed_countries: [
        'US', 'CA', 'GB', 'AU', 'NZ', 'AT', 'BE', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'NL', 'NO', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE', 'CH', 'JP', 'CN', 'HK', 'SG'
      ],
    },
    billing_address_collection: 'required',
    success_url: `${process.env.CLIENT_URL}success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}cart`,
  });

  res.json({ url: session.url }); 
}

const verifyOrder = async (req, res) => {
    try{
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (!session) return res.status(400).json({ status: "support" });

        const sessionexists = await pool.query("SELECT * FROM orders WHERE id = $1", [sessionId])
        if (sessionexists.rows.length > 0) {
            return res.status(200).json({ status: "support" }); // Already processed
        }        

        const {email} = req.user
        const today = new Date()
        const date = today.toISOString().slice(0,10)
        const insertResponse = await pool.query("INSERT INTO orders(id, date, shipping_price, user_email, street_address,city, country, postcode) VALUES ($1, $2, 0, $3, $4, $5, $6, $7 )", [sessionId, date, email, `${session.customer_details.address.line1} ${session.customer_details.address.line2}`, session.customer_details.address.city, session.customer_details.address.country ,session.customer_details.address.postal_code ])

        const productIds = JSON.parse(session.metadata.productIds);
        for (const productId of productIds) {
                let OrderProductId = await pool.query("select id FROM orders_Product ORDER BY ID DESC LIMIT 1")
                OrderProductId = OrderProductId.rows[0] ? OrderProductId.rows[0].id +1 : 1
                await pool.query(
                    "INSERT INTO orders_Product VALUES ($1, $2, $3)",
                    [OrderProductId, productId, sessionId]
                );
            }

        const deleteCart = await pool.query("DELETE FROM cart_product WHERE cart_id = (SELECT id FROM cart WHERE user_email = $1);", [email])
        res.status(200).json({status: "true"})

    } catch (err){
        res.status(500).json({err: err})
    }

        
};

module.exports = {
    createPaymentIntent, 
    verifyOrder
}