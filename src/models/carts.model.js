const { Schema, model } = require('mongoose')

const collectionCart = 'carts'

const CartSchema = new Schema({
    productsCart: [{
        idProducto: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        }
    }]
})

module.exports = model(collectionCart, CartSchema)