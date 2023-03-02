const { Router } = require('express');
// const ProductManager = require('../utils/manejoProductos.js');
// const { escribirArchivo, leerArchivo } = require('../utils/funcAux.js')
const router = Router();

const productModel = require('../models/products.model.js')

// const pathFile = './data.txt';

// const data = new ProductManager(pathFile);

/***********************************************/
/* Devuelve todos los prouctos ó rango limitados productos*/
/***********************************************/
router.get('/', async (req, res) => {

    const { limit } = req.query;
    try {
        /* Si no se ingresa el parametro "limit" -> Se devuelve todos los productos */
        if (!limit) {
            const ListCompleteProducts = await productModel.find({})
            /* Respuesta */
            return res.status(200).send({
                message: 'We show all products',
                ListCompleteProducts
            })
        }
        /* Si existe el parametro "limit" -> Se devuelve lo siguiente... */
        const limitedProducts = await productModel.find({}).limit(parseInt(limit))
        /* Respuesta */
        res.status(201).send({
            message: 'We show some products',
            limitedProducts
        })
    } catch (error) {
        res.status(200).send({
            message: 'Error to see all products',
            error
        })
    }
})

/***********************************************/
/* Devuelve un producto */
/***********************************************/
router.get('/:idProd', async (req, res) => {
    const { idProd } = req.params

    try {
        /* Si el producto con el ID existe, lo buscamos */
        const productSelection = await productModel.find({ _id: idProd })
        /* Respuesta */
        res.status(200).send({
            message: 'We get information about a product',
            productSelection
        })
    } catch (error) {
        /* Si el ID del producto no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Product ID to add does not exist',
            error
        })
    }

})

/***********************************************/
/* Eliminar un producto en particular */
/***********************************************/
router.delete('/:idProd', async (req, res) => {
    const { idProd } = req.params
    try {
        /* Si el producto con el ID existe, eliminamos el producto */
        const deleteProduct = await productModel.deleteOne({ _id: idProd })
        /* Respuesta */
        res.status(200).send({
            message: 'we delete information about a product',
            deleteProduct
        })
    } catch (error) {
        /* Si el ID del producto no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Product ID to delete does not exist',
            error
        })
    }


    /* Validacion de que producto a eliminar NO existe */
    const productTest = await productModel.find({ _id: idProd })
    if (!productTest) return res.status(200).send('Product does not exist')
    /* Eliminamos el producto (Existe)*/
})

/***********************************************/
/* Agregar un producto */
/***********************************************/
router.post('/', async (req, res) => {
    /* Tomamos los datos del body */
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    // Agregamos el nuevo producto en la Db
    const newProduct = await productModel.create({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    })
    /* Respuesta */
    res.status(201).send({
        message: 'Producto Agregado',
        newProduct
    })
})

/***********************************************/
/* Modificar un producto un producto */
/***********************************************/
router.put('/:idProd', async (req, res) => {
    const { idProd } = req.params;
    /* Tomamos los datos del body */
    const { title } = req.body;
    try {
        /* Si el producto con el ID existe, actualizamos los campos */
        const productChanged = await productModel.updateOne({ _id: idProd }, { title })
        /* Respuesta */
        res.status(200).send({
            message: 'We changed information about a product',
            productChanged
        })

    } catch (error) {
        /* Si el ID del producto no existe, devolvemos lo siguiente... */
        res.status(200).send({
            message: 'Product ID to add does not exist',
            error
        })
    }
})


module.exports = router;