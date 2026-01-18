const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Ecom API is running')
})

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`)
})