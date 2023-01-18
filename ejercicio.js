/***********************************************/
/***********************************************/
/********* DESAFIO 01 BORIS CHOQUE**************/
/***********************************************/
/***********************************************/

/* Definimos la clase USUARIO */

class ProductManager {
    constructor() {
        this.products = [];
    }

    /* Método 1 */
    addProduct = (item) => {
        /* Validación por campo "code" */
        const validation1 = this.products.find(producto => producto.code === item.code)

        if (validation1) {
            return 'El producto ya esta en la lista';
        }

        /* Validación por campo vacio */
        if (item.title === '' || item.description === '' || item.price === '' || item.thumbnail === '' || item.code === '' || item.stock === '') {
            return `Debe completar todos los campos `
        }


        /* Ingreso de producto */
        if (this.products.length === 0) {
            /* Si esta condición se cumple, el ID = 1 ya que es el primer producto */
            item.id = 1;
            /*Guardamos el nuevo prdducto en la lista de productos. */
            this.products.push(item)
        } else {
            /* Como ya existen productos, se genera un nuevo valor de ID */
            /*Generamos y Guardamos el valor del ID del producto */
            const idNuevo = this.products[this.products.length - 1].id + 1;
            /*Guardamos el nuevo prdducto en la lista de productos. */
            this.products = [...this.products, { ...item, id: idNuevo }]
        }
    }
    /* Método 2 */
    getProducts = () => this.products;

    /* Método 3 */
    getProductById = (idBuscado) => {
        const validation3 = this.products.find(producto => producto.id === idBuscado)

        if (!validation3) {
            return `NO existe el producto de id: ${idBuscado}`;
        }

        return this.products.find(({ id }) => id === idBuscado)
    }

}

const producto1 = {
    title: '',
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


const producto = new ProductManager();
producto.addProduct(producto1)
producto.addProduct(producto2);
producto.addProduct(producto3);
console.log(producto.getProducts());
console.log(producto.getProductById(2));