/***********************************************/
/***********************************************/
/********* DESAFIO 06 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const express = require('express');
const productsRouter = require('./routes/productos.router');
const cartRouter = require('./routes/carrito.router');
// const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');
// const { Server } = require('socket.io');
const { ConnectionDB } = require('./config/conectionMongo');
const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexion Bases de datos_________________________________
ConnectionDB()
//_____________________________________________________

// Motor de plantillas_________________________________
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//_____________________________________________________

app.use('/public', express.static(__dirname + '/public'))

app.use('/api/products', productsRouter);

app.use('/api/carts', cartRouter);

// app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})