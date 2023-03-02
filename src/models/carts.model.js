const { Schema, model } = require('mongoose')

const collectionCart = 'carts'

const CartSchema = new Schema({
    listcart: {
        idProducto: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        }
    }

})

module.exports = model(collectionCart, CartSchema)