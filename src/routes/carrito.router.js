const { Router } = require('express');
const CartManager = require('../utils/manejoCarrito.js');
const ProductManager = require('../utils/manejoProductos.js');
const router = Router();

const pathFileCart = './cart.txt';
const pathFileData = './data.txt';

const cartProd = new CartManager(pathFileCart);
const data = new ProductManager(pathFileData);

/***********************************************/
/* Crear un nuevo carrito*/
/***********************************************/
router.post('/', (req, res) => {
    /* Creamos un nuevo carrito */
    cartProd.createProductCart();
    res.status(200).send('New Cart created...');

})

/***********************************************/
/* Carga de productos en carrito*/
/***********************************************/
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params
    /* Validamos el que producto existe */
    const productSelection = data.getProductById(parseInt(pid))
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!productSelection) return res.send('Product does not exist')

    /* Validamos que el carrito existe */
    const listProd = cartProd.getProductCartById(parseInt(cid));
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!listProd) return res.send('Cart does not exist')

    /* Agregamos el producto al carrito */
    cartProd.addProductCart(parseInt(cid), parseInt(pid));
    res.status(200).send('New Product add to Cart');

})

/***********************************************/
/* Listado de productos en carrito*/
/***********************************************/
router.get('/:cid', (req, res) => {
    const { cid } = req.params
    /* Lista de productos en carrito */
    const listProd = cartProd.getProductCartById(parseInt(cid));
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!listProd) return res.send('Cart does not exist')

    /* Si el ID existe, devolvemos los datos del producto */
    res.status(200).send(listProd.products)

})

module.exports = router;