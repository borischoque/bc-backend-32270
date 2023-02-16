const { Router } = require('express');
const ProductManagerSocket = require('../utils/manejoProductos.js');
const router = Router();

const pathFileSocket = './dataSocket.txt';
const pathFile = './data.txt';


const data = new ProductManagerSocket(pathFile);

const dataSocket = new ProductManagerSocket(pathFileSocket);

router.get('/products', (req, res) => {
    const listProducts = data.getProducts();

    res.render('index', { listProducts })
})

router.get('/real', (req, res) => {
    const listProducts = dataSocket.getProducts();
    const tempData = [...listProducts]
    res.render('realTimeProducts', { tempData })
})




module.exports = router;

