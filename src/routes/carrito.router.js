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
        const productInput = await productModel.findOne({ _id: pid });
        if (!productInput) {
            return res.status(404).send({
                message: 'Product does not exist'
            })
        }

        const cartInput = await cartModel.findOne({ _id: cid });
        if (!cartInput) {
            return res.status(404).send({
                message: 'Cart does not exist'
            })
        }

        const productExist = await cartModel.findOne({ _id: cid, "productsCart.idProducto": pid })
        if (productExist) {
            await cartModel.updateOne({ _id: cid, "productsCart.idProducto": pid }, { $inc: { "productsCart.$.quantity": 1 } })
            return res.status(200).send({
                message: 'Product exist, was updated field quantity'
            })
        } else {
            await cartModel.updateOne({ _id: cid }, { $push: { productsCart: { idProducto: pid, quantity: 1 } } })
            return res.status(200).send({
                message: 'Product was added to Cart'
            })
        }
    } catch (error) {
        /* Si el ID del carrito no existe, devolvemos lo siguiente... */
        res.status(500).send({
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