/***********************************************/
/***********************************************/
/********* DESAFIO 05 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const productsRouter = require('./routes/productos.router');
const cartRouter = require('./routes/carrito.router');
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Motor de plantillas_________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//_____________________________________________________

app.use('/public', express.static(__dirname + '/public'))

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})

const socketServer = new Server(httpServer);

// Manejo de archivos con WebSocket______________________________
const ProductManagerSocket = require('./utils/manejoProductos.js');
const pathFileSocket = './dataSocket.txt';
const dataSocket = new ProductManagerSocket(pathFileSocket);
//_____________________________________________________

socketServer.on('connection', socket => {
    console.log('nuevo cliente conectado');

    socket.on('product', data => {
        dataSocket.addProduct(data)

        socketServer.emit('agregarProducto', dataSocket.getProducts())
    })

    socket.on('eliminar', idProd => {
        dataSocket.deleteProduct(idProd)

        socketServer.emit('agregarProducto', dataSocket.getProducts())
    })

})