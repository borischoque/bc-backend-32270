const { Schema, model } = require('mongoose')

const collectionMessages = 'messages'

const MessagesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = model(collectionMessages, MessagesSchema)