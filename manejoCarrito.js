const fs = require('fs');
const { escribirArchivo, leerArchivo } = require('./funcAux.js')


/* Definimos la clase CartManager */

class CartManager {
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
    createProductCart() {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo AGREGAR un carrito');
            /* Si el archivo ya existe, lo leemos. */
            let listaCarrito = leerArchivo(this.path)
            if (listaCarrito.length === 0) {
                /* Si esta condición se cumple, el ID = 1 ya que es el primer carrito*/
                const auxiliarObject1 = {
                    idCarrito: 1,
                    products: []
                }
                listaCarrito.push(auxiliarObject1)
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaCarrito)
                console.log('Se guardo el primer carrito en el archivo')
            } else {
                /* Como ya existe el carrito, se genera un nuevo valor de ID */
                /*Generamos y Guardamos el valor del ID del producto */
                const idNuevo = listaCarrito[listaCarrito.length - 1].idCarrito + 1;
                /*Guardamos el nuevo prdducto en la lista de productos. */
                listaCarrito = [...listaCarrito, { idCarrito: idNuevo, products: [] }]
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaCarrito)
                console.log(`------- Carrito creado ------->idCarrito: ${idNuevo}`)
            }

        } else {
            console.log('El carrito no existe tiene que crear una instancia de la clase CartManager');
        }
    }

    /* Método 2 */
    getProductCartById(idBuscado) {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo OBTENER productos de un Carrito Especifico');
            /* Si el archivo ya existe, lo leemos. */
            const listaCarrito = leerArchivo(this.path)
            const validation3 = listaCarrito.find(producto => producto.idCarrito === idBuscado)

            if (!validation3) {
                console.log(`NO existe el carrito de id: ${idBuscado}`);
                return false;
            }
            return listaCarrito.find(({ idCarrito }) => idCarrito === idBuscado)

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase CartManager');
        }

    }
    /* Método 3 */
    addProductCart(idCart, idProd) {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo AGREGAR productos a un Carrito Especifico');
            /* Si el archivo ya existe, lo leemos. */
            const listaCarrito = leerArchivo(this.path)

            /* Validación por id de producto */
            const arrayProducts = this.getProductCartById(idCart).products;
            /* Identificamos si el producto ya existe */
            const validationCart = arrayProducts.find(cart => cart.idProducto === idProd)
            if (validationCart) {
                /* Incrementamos la cantidad del producto ya existente */
                validationCart.quantity++;
                /* Guardamos los cambios en los datos */
                listaCarrito.find(({ idCarrito }) => idCarrito === idCart).products = arrayProducts;
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaCarrito)
            } else {
                /* Creamos el nuevo producto para agregar al carrito */
                const auxiliarObject2 = {
                    idProducto: idProd,
                    quantity: 1
                }
                /* Agregamos el nuevo pedido de producto al carrito */
                const productAdd = [...arrayProducts, auxiliarObject2]
                /* Guardamos los cambios en los datos */
                listaCarrito.find(({ idCarrito }) => idCarrito === idCart).products = productAdd;
                /*Guardamos el nuevo producto en el archivo */
                escribirArchivo(this.path, listaCarrito)
            }

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase CartManager');
        }

    }
}

module.exports = CartManager;