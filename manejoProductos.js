const fs = require('fs')
const { escribirArchivo, leerArchivo } = require('./funcAux.js')

/* Definimos la clase ProductManager */

class ProductManager {
    constructor(path) {

        this.path = path;
        /* Acontinuación consideramos si ya existe un archivo */
        if (fs.existsSync(this.path)) {
            console.log('El archivo ya existe');
        } else {
            /* Si el archivo no existe, lo creo y agrego el contenido del array vacio */
            escribirArchivo(this.path, [])
            console.log('Se creo un archivo nuevo, ya que no existía');
        }
    }

    /* Método 1 */
    addProduct = (item) => {

        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo AGREGAR un producto');
            /* Si el archivo ya existe, lo leemos. */
            let listaProductos = leerArchivo(this.path)

            /* Validación por campo "code" */
            const validation1 = listaProductos.find(producto => producto.code === item.code)

            if (validation1) {
                return 'El producto ya esta en la lista';
            }

            /* Validación por campo vacio */
            if (item.title === '' || item.description === '' || item.price === '' || item.thumbnail === '' || item.code === '' || item.stock === '') {
                return `Debe completar todos los campos `
            }

            /* Ingreso de producto */
            if (listaProductos.length === 0) {
                /* Si esta condición se cumple, el ID = 1 ya que es el primer producto */
                item.id = 1;
                /*Guardamos el nuevo prdducto en la lista de productos. */
                listaProductos.push(item)
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaProductos)
                console.log('Se guardo el primer producto en el archivo')

            } else {
                /* Como ya existen productos, se genera un nuevo valor de ID */
                /*Generamos y Guardamos el valor del ID del producto */
                const idNuevo = listaProductos[listaProductos.length - 1].id + 1;
                /*Guardamos el nuevo prdducto en la lista de productos. */
                listaProductos = [...listaProductos, { ...item, id: idNuevo }]
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaProductos)
                console.log(`-------Se agregó un nuevo producto al archivo------->id: ${idNuevo}`)
            }

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase ProductManager');
        }

    }

    /* Método 2 */
    getProducts = () => {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo OBTENER TODOS los productos');
            /* Si el archivo ya existe, lo leemos. */
            const listaProductos = leerArchivo(this.path)
            // console.log(listaProductos)
            return listaProductos

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase ProductManager');
        }
    }

    /* Método 3 */
    getProductById = (idBuscado) => {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo OBTENER un Producto Especifico');
            /* Si el archivo ya existe, lo leemos. */
            const listaProductos = leerArchivo(this.path)
            const validation3 = listaProductos.find(producto => producto.id === idBuscado)

            if (!validation3) {
                return `NO existe el producto de id: ${idBuscado}`;
            }
            return listaProductos.find(({ id }) => id === idBuscado)

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase ProductManager');
        }
    }
    /* Método 4 */
    deleteProduct = (idDelete) => {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo ELIMINAR un Producto Especifico');
            /* Si el archivo ya existe, lo leemos. */
            const listaProductos = leerArchivo(this.path)
            /* Generamos un nuevo array auxiliar, excluyento el producto especifico */
            const validation4 = listaProductos.filter(prodId => prodId.id !== idDelete)
            /*Guardamos la nueva lista en el archivo */
            escribirArchivo(this.path, validation4)
            console.log(`-------Se eliminó un producto del archivo------->id: ${idDelete}`)
        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase ProductManager');
        }
    }
    /* Método 5 */
    updateProduct = (idCambio, obj) => {
        /* Encontramos el objeto a modificar según su ID */
        let cambioProducto = this.getProductById(idCambio)
        /* Aplicamos el cambio a las propiedades deseadas, en este caso se indican*/
        cambioProducto.title = obj.title;
        cambioProducto.descripcion = obj.descripcion;
        cambioProducto.price = obj.price;
        cambioProducto.thumbnail = obj.thumbnail;
        /* Eliminamos el objeto del archivo */
        this.deleteProduct(idCambio);
        /* Extraemos los productos existentes del archivo */
        const listaProductos = leerArchivo(this.path)
        /* Agregamos el objeto con la propiedad modificada a la lista de productos */
        listaProductos.push(cambioProducto)
        /*Guardamos el nuevo listado en el archivo */
        escribirArchivo(this.path, listaProductos)
        console.log(`-------Se MODIFICO una propiedad de un nuevo producto en el archivo------->id: ${idCambio}`)
    }

}

module.exports = ProductManager;