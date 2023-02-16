const { Router } = require('express');
const ProductManager = require('../utils/manejoProductos.js');
const { escribirArchivo, leerArchivo } = require('../utils/funcAux.js')
const router = Router();

const pathFile = './data.txt';

const data = new ProductManager(pathFile);

/***********************************************/
/* Devuelve todos los prouctos ó rango limitados productos*/
/***********************************************/
router.get('/', (req, res) => {

    const { limit } = req.query;
    const products = data.getProducts();

    /* Si no se ingresa el parametro "limit" -> Se devuelve todos los productos */
    if (!limit) return res.status(200).send(products)
    /* Si existe el parametro "limit" -> Se devuelve lo siguiente... */
    const limitedProducts = products.slice(0, parseInt(limit));
    res.status(200).send(limitedProducts)
})

/***********************************************/
/* Devuelve un producto */
/***********************************************/
router.get('/:idProd', (req, res) => {
    const { idProd } = req.params
    const productSelection = data.getProductById(parseInt(idProd))
    /* Si el ID del producto no existe, devolvemos lo siguiente... */
    if (!productSelection) return res.send('Product does not exist')

    /* Si el ID existe, devolvemos los datos del producto */
    res.status(200).send(productSelection)
})

/***********************************************/
/* Eliminar un producto en particular */
/***********************************************/
router.delete('/:idProd', (req, res) => {
    const { idProd } = req.params
    /* Validacion de que producto a eliminar NO existe */
    const productTest = data.getProductById(parseInt(idProd))
    if (!productTest) return res.status(200).send('Product does not exist')
    /* Eliminamos el producto (Existe)*/
    data.deleteProduct(parseInt(idProd))
    /* Respuesta de que elimino producto */
    res.status(200).send(`-------Se eliminó un producto del archivo------->id: ${idProd}`)
})

/***********************************************/
/* Agregar un producto */
/***********************************************/
router.post('/', (req, res) => {
    /* Tomamos el nuevo producto agregar del body*/
    let newProduct = req.body;
    /* Agregamos el producto al archivo de datos */
    data.addProduct(newProduct);
    /* Respuesta */
    res.status(201).send({
        message: 'Producto Agregado',
        newProduct
    })

})

/***********************************************/
/* Modificar un producto un producto */
/***********************************************/
router.put('/:idProd', (req, res) => {
    const { idProd } = req.params;
    /* Tomamos el nuevo producto agregar del body*/
    let changedProduct = req.body;
    /* Validacion de que producto a eliminar NO existe */
    const productTest = data.getProductById(parseInt(idProd))
    if (!productTest) return res.status(200).send('Product does not exist')
    /* Actualizamos la propiedades del producto */
    data.updateProduct(parseInt(idProd), changedProduct);
    /* Respuesta */
    res.status(201).send({
        id: parseInt(idProd),
        message: 'Producto Cambiado',
        changedProduct
    })

})


module.exports = router;