/***********************************************/
/***********************************************/
/********* DESAFIO 02 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/
const fs = require('fs')

/* Definimos la clase ProductManager */

class ProductManager {
    constructor(path) {

        this.path = path;
        /* Acontinuación consideramos si ya existe un archivo */
        if (fs.existsSync(this.path)) {
            console.log('El archivo ya existe');
        } else {
            /* Si el archivo no existe, lo creo y agrego el contenido del array vacio */
            fs.writeFileSync(this.path, JSON.stringify([], null, 2))
            console.log('Se creo un archivo nuevo, ya que no existía');
        }
    }

    /* Método 1 */
    addProduct = (item) => {

        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo AGREGAR un producto');
            /* Si el archivo ya existe, lo leemos. */
            let lista = fs.readFileSync(this.path, 'utf-8')
            let listaProductos = JSON.parse(lista);

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
                fs.writeFileSync(this.path, JSON.stringify(listaProductos, null, 2))
                console.log('Se guardo el primer producto en el archivo')

            } else {
                /* Como ya existen productos, se genera un nuevo valor de ID */
                /*Generamos y Guardamos el valor del ID del producto */
                const idNuevo = listaProductos[listaProductos.length - 1].id + 1;
                /*Guardamos el nuevo prdducto en la lista de productos. */
                listaProductos = [...listaProductos, { ...item, id: idNuevo }]
                /*Guardamos el nuevo producto en el archivo */
                fs.writeFileSync(this.path, JSON.stringify(listaProductos, null, 2))
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
            let lista = fs.readFileSync(this.path, 'utf-8')
            let listaProductos = JSON.parse(lista);
            console.log(listaProductos)
            return listaProductos

        } else {
            console.log('El archivo no existe tiene que crear una instancia de la clase ProductManager');
        }
    }

    /* Método 3 */
    getProductById = (idBuscado) => {
        if (fs.existsSync(this.path)) {
            console.log('Ingreso a ----> Metodo OBTENER un Producto Especifico');
            let lista = fs.readFileSync(this.path, 'utf-8')
            let listaProductos = JSON.parse(lista);
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
            let lista = fs.readFileSync(this.path, 'utf-8')
            let listaProductos = JSON.parse(lista);
            /* Generamos un nuevo array auxiliar, excluyento el producto especifico */
            const validation4 = listaProductos.filter(prodId => prodId.id !== idDelete)
            /*Guardamos la nueva lista en el archivo */
            fs.writeFileSync(this.path, JSON.stringify(validation4, null, 2))
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
        let lista = fs.readFileSync(this.path, 'utf-8')
        let listaProductos = JSON.parse(lista);
        /* Agregamos el objeto con la propiedad modificada a la lista de productos */
        listaProductos.push(cambioProducto)
        /*Guardamos el nuevo listado en el archivo */
        fs.writeFileSync(this.path, JSON.stringify(listaProductos, null, 2))
        console.log(`-------Se MODIFICO una propiedad de un nuevo producto en el archivo------->id: ${idCambio}`)
    }

}

const producto1 = {
    title: 'titulo 1',
    descripcion: 'descripción 1',
    price: 'precio 1',
    thumbnail: 'thumbnail 1',
    code: 'codigo 1',
    stock: 'stock 1'
}

const producto2 = {
    title: 'titulo 2',
    descripcion: 'descripción 2',
    price: 'precio 2',
    thumbnail: 'thumbnail 2',
    code: 'codigo 2',
    stock: 'stock 2'
}

const producto3 = {
    title: 'titulo 3',
    descripcion: 'descripción 3',
    price: 'precio 3',
    thumbnail: 'thumbnail 3',
    code: 'codigo 3',
    stock: 'stock 3'
}

const producto4 = {
    title: 'titulo 4',
    descripcion: 'descripción 4',
    price: 'precio 4',
    thumbnail: 'thumbnail 4',
    code: 'codigo 4',
    stock: 'stock 4'
}
const producto5 = {
    title: 'titulo 5',
    descripcion: 'descripción 5',
    price: 'precio 5',
    thumbnail: 'thumbnail 5',
    code: 'codigo 5',
    stock: 'stock 5'
}

const productCambio = {
    title: 'titulo cambio',
    descripcion: 'descripción cambio',
    price: 'precio cambio',
    thumbnail: 'thumbnail cambio',
    code: 'codigo cambio',
    stock: 'stock cambio'
}


const producto = new ProductManager('./data.txt');
producto.addProduct(producto2)
producto.addProduct(producto3)
producto.addProduct(producto1)
producto.getProducts()
producto.addProduct(producto4)
producto.addProduct(producto5)
console.log(producto.getProductById(2));
producto.deleteProduct(1);
producto.updateProduct(3, productCambio)