const { Router } = require('express');
const router = Router();
const cartModel = require('../models/carts.model.js');
const productModel = require('../models/products.model.js')

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
        /* Validamos el que producto existe */
        try {
            const productInput = await productModel.find({ _id: pid });
        } catch (error) {
            res.status(200).send({
                message: 'Product does not exist',
                error
            })
        }
        /* Validamos el que carrito existe */
        try {
            const cartInput = await cartModel.find({ _id: cid });
        } catch (error) {
            res.status(200).send({
                message: 'Cart does not exist',
                error
            })
        }
        /* Buscamos si el producto ya existe en el carrito seleccionado */
        const productExist = await cartModel.find({ $and: [{ _id: cid }, { "productsCart.idProducto": pid }] })
        if (!productExist) {
            const cartUpdate = await cartModel.updateOne({ $and: [{ _id: cid }, { "productsCart.idProducto": pid }] }, { $inc: { "productsCart.quantity": 1 } })
            return res.status(200).send({
                message: 'Product exist, was updated field quantity',
                cartUpdate
            })

        } else {
            const cartAdd = await cartModel.updateOne({ _id: cid }, { $push: { productsCart: { idProducto: pid } } })
            return res.status(200).send({
                message: 'Product was added to Cart',
                cartAdd
            })
        }

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