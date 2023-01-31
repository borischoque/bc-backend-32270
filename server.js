/***********************************************/
/***********************************************/
/********* DESAFIO 03 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

const { response } = require('express');
const express = require('express');
const ProductManager = require('./manejoProductos.js');
const { escribirArchivo, leerArchivo } = require('./funcAux.js')
const app = express();
const PORT = 8081;

const productos = new ProductManager('./data.txt');

app.use(express.urlencoded({ extended: true }));

/***********************************************/
/* Devuelve todos los prouctos ó limitados productos*/
/***********************************************/
app.get('/products', (req, res) => {
    console.log(req.query);
    const { limit } = req.query;
    /* Si el archivo ya existe, lo leemos. */
    const listaProductos = leerArchivo('./data.txt')
    if (!limit) {
        res.send(productos.getProducts())
    } else if (listaProductos.length >= parseInt(limit)) {
        /* Generamos un nuevo array auxiliar, aplicando la condición */
        const productosFiltrados = listaProductos.filter(inProd => inProd.id <= parseInt(limit))
        res.send(productosFiltrados)
    } else {
        res.send('El parametro indicado es mayor a la cantidad de producto disponibles, ingrese un valor menor ó NO INGRESE PARAMETRO');
    }

})

/***********************************************/
/* Devuelve un producto en particular */
/***********************************************/
app.get('/products/:idProd', (req, res) => {
    const { idProd } = req.params
    productoSeleccion = productos.getProductById(parseInt(idProd))
    if (!productoSeleccion) return res.send('No existe el producto.')
    res.send(productoSeleccion)
})


app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}/products`);
})