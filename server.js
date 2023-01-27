/***********************************************/
/***********************************************/
/********* DESAFIO 03 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const ProductManager = require('./manejoProductos.js');
const app = express();
const PORT = 8081;

const productos = new ProductManager('./data.txt');

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
    res.send(productos.getProducts())
})



app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}/products`);
})