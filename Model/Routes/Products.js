const {pool} = require('../DB/index');

const getProduct = (req, res) => {
    pool.query('SELECT P.ID AS "Product ID", P.name AS "Product Name", P.price AS "Price", P.Image AS "Image", P.Weight AS "Weight", P.description AS "description", P.image2 AS "image2", P.otherimages AS "otherimages" FROM Product AS P',(error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getProductByID = (req,res) => {
    const {id} = req.params

    pool.query('SELECT * FROM product WHERE id = $1',[id], (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const deleteProductByID = async (req,res) => {
    const {id} = req.params

    try {
        const itemexists = await pool.query('SELECT * FROM product WHERE ID = $1', [id])
        if (itemexists.rows.length === 0){
            res.status(404).json({message: "Product not found."})
        }
        await pool.query("DELETE FROM product WHERE id = $1", [id])
        res.status(200).json({message: "Succusfully Deleted"})
    } catch (error){
        error.error
        res.status(500).json({error: error})
    }
}

const updateProductByID = async (req,res) => {
    const {id} = req.params
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    const valid_updates = ["name", "price",	"image", "weight", "description"]
    const is_valid_update = keys.every(key => valid_updates.includes(key))

    if (!is_valid_update){
        res.status(400).json({message: "One or more update fields are invalid"})
    }

    const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');

    values.push(id);
    const idPosition = values.length;

    const queryText = `UPDATE product SET ${setClause} WHERE id = $${idPosition}`;
    console.log(queryText)
    console.log(values)
    try {
        const itemexists = await pool.query('SELECT * FROM product WHERE ID = $1', [id])
        if (itemexists.rows.length === 0){
            res.status(404).json({message: "Product not found."})
        }
        await pool.query(queryText, values)
        res.status(200).json({message: "Succusfully Updated"})
    } catch (error){
        console.error(error)
        res.status(500).json({error: error})
    }
}


const newProduct = async (req,res) => {
    const {name, price,	image, weight, description} = req.body
    
    try{
        const getID = await pool.query("SELECT ID FROM product ORDER BY ID DESC LIMIT 1")
        const id = getID.rows[0].id + 1 
        await pool.query('INSERT INTO product VALUES ($1, $2, $3, $4, $5, $6)', [id, name, price, image, weight, description])
        res.status(200).json({message: "Product Added Succusfully"})
    } catch(error){
        console.error(error)
        res.status(500).json({error:error})
    }
}

const getProductBySearch = async (req, res) => {
    const {searchterm} = req.params
    const value = `%${searchterm}%`
    try{
        const results = await pool.query('SELECT P.ID AS "Product ID", P.name AS "Product Name", P.price AS "Price", P.Image AS "Image", P.Weight AS "Weight", P.description AS "description", P.image2 AS "image2", P.otherimages AS "otherimages" FROM Product AS P WHERE P.name ILIKE $1', [value])
        res.status(200).json(results.rows)
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getProduct,
    getProductByID,
    deleteProductByID,
    updateProductByID,
    newProduct, 
    getProductBySearch
}