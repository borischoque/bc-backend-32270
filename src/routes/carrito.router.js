const { Router } = require('express');
const router = Router();
const cartModel = require('../models/carts.model.js');

/***********************************************/
/* Crear un nuevo carrito*/
/***********************************************/
router.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({})
        /* Respuesta */
        res.status(201).send({
            message: 'Cart Created',
            newCart
        })
    } catch (error) {
        /* Si el ID del carrito no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Cart no was created',
            error
        })
    }

})

/***********************************************/
/* Carga de productos en carrito*/
/***********************************************/
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        /* Se define el array con los nuevos datos */
        const addProduct = { idProducto: pid, quantity: 1 }
        /* Si el producto con el ID existe, actualizamos los campos */
        const cartUpdate = await cartModel.updateOne({ _id: cid }, { $push: { productsCart: addProduct } })
        /* Respuesta */
        return res.status(200).send({
            message: 'We Update information about a Cart',
            cartUpdate
        })

    } catch (error) {
        /* Si el ID del carrito no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Cart not was Updated',
            error
        })
    }
})

/***********************************************/
/* Listado de productos en carrito*/
/***********************************************/
router.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const ListCompleteCart = await cartModel.find({ _id: cid })
        /* Respuesta */
        return res.status(200).send({
            message: 'We show all products in the Cart',
            ListCompleteCart
        })
    } catch (error) {
        /* Si el ID del carrito no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Cart no was exist',
            error
        })
    }

})

module.exports = router;