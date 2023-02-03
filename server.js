/***********************************************/
/***********************************************/
/********* DESAFIO 04 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const productsRouter = require('./routes/productos.router');
const cartRouter = require('./routes/carrito.router');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);


app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})