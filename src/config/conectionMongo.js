const { connect, set } = require('mongoose')

set("strictQuery", false);

const ConnectionDB = async () => {
    try {
        const url = 'mongodb+srv://choquebboris:4XHs0aeE3SJGnsbW@cluster0.nsbkvnk.mongodb.net/ecommerce?retryWrites=true&w=majority'
        console.log('Conectado a Mongo')
        return await connect(url)
    } catch (error) {
        console.log('No se puede conectar mongodb: ', error)
        process.exit()
    }
}

module.exports = { ConnectionDB };