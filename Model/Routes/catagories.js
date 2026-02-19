const {pool} = require('../DB/index');

const catagoryByName = async (req,res) => {
    try {
        const {name} = req.params
        const catagories = await pool.query('Select * From Catagory')
        const catNames =  catagories.rows.map(cat => cat.name);
        if (!catNames.includes(name)) {
            return res.status(404).json({ message: 'Catagory Not Found'})
        }
        const SelectedCat = await pool.query('Select * FROM Catagory WHERE name = $1', [name])
        res.status(200).json(SelectedCat.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json( {message: 'server error'} )
    }
};

const newCategory = async (req,res) => {
    const {name, description} = req.body 
    try {
        const idResult = await pool.query("SELECT ID FROM Catagory ORDER BY ID DESC LIMIT 1");
        const id = idResult.rows.length > 0 ? idResult.rows[0].id + 1 : 1;
        
        await pool.query("INSERT INTO Catagory VALUES ($1, $2, $3)", [id, name, description])
        res.status(201).json({message: 'Category created successfully'})
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

const allCategories = (req,res) => {
    pool.query('SELECT * FROM Catagory', (error, results) => {
         if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addProductToCategory = async (req, res) => {
    const { product_id, category_id } = req.body;
    try {
        await pool.query("INSERT INTO PRODUCT_CATAGORY (Product_ID, Catagory_ID) VALUES ($1, $2)", [product_id, category_id]);
        res.status(201).json({ message: "Product linked to Category" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCatagory = async (req,res) => {
    const {id} = req.params 

    try{
        const catagory = await pool.query('SELECT * FROM Catagory WHERE ID = $1', [id]);
        if (catagory.rows.length === 0){
            return res.status(404).json({message: "Catagory Not Found"})
        }
        await pool.query('DELETE FROM Catagory WHERE id = $1', [id]);
        res.status(200).json({message: "succusfully deleted"})
    } catch (error){
        console.error(error)
        res.status(500).json({error: "error"})
    }
}

const updateCatagory = async (req,res) => {
    const {id} = req.params
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)
    
    // Only Name and description are allowed to be updated
    const valid_changes = ["name", "description"]
    const changes_are_valid = keys.every(key => valid_changes.includes(key))
    
    if (!changes_are_valid){
        return res.status(403).json({message: "One or more fields are invalid or restricted"})
    }

    if (keys.length === 0) {
        return res.status(400).json({ message: "Nothing to update" });
    }

    const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    values.push(id);
    const idPosition = values.length;

    const queryText = `UPDATE Catagory SET ${setClause} WHERE id = $${idPosition}`;

    try{
        const catagory = await pool.query('SELECT * FROM Catagory WHERE ID = $1', [id]);
        if (catagory.rows.length === 0){
            return res.status(404).json({message: "Catagory Not Found"})
        }
        await pool.query(queryText, values);
        res.status(200).json({ message: "Catagory updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const allItemsInCatagory = (req,res) => {
    const {id} = req.params
    pool.query('SELECT P.ID AS "Product ID", P.name AS "Product Name", P.price AS "Price", P.Image AS "Image", P.Weight AS "Weight", P.description AS "description", P.image2 AS "image2", P.otherimages AS "otherimages", C.name AS "Catagory Name" FROM Product AS P, Catagory AS C, Product_Catagory AS PC WHERE PC.product_id = P.id AND PC.catagory_id = C.id AND C.id = $1', [id], (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}; 

const top10InCat = (req,res) => {
    const {id} = req.params
    pool.query('SELECT P.ID AS "id", P.name AS "name", P.price AS "Price", P.Image AS "image", P.Weight AS "weight", P.description AS "description", P.image2 AS "image2", P.otherimages AS "otherimages", count(OP.product_id) FROM Product AS P, Product_Catagory AS PC, orders_product AS OP  WHERE PC.product_id = P.id AND PC.catagory_id = $1 AND P.id = OP.product_id  GROUP BY PC.product_id, p.id, OP.product_id ORDER BY COUNT(OP.product_id) DESC LIMIT 10', [id], (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    allItemsInCatagory,
    updateCatagory,
    deleteCatagory,
    allCategories,
    addProductToCategory,
    newCategory, 
    catagoryByName,  
    top10InCat
}