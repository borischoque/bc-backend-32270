const SoServer = io();

// PARA AGREGADO DE PRODUCTOS____________________________

/* Capturamos el boton de envio para agregar producto*/
const envioProducto = document.querySelector('#envioProducto')

/* capturamos los valores del Form para agregar producto*/
const title = document.querySelector('#title')
const description = document.querySelector('#description')
const price = document.querySelector('#price')
const category = document.querySelector('#category')

/* creamos el evento para enviar la información del nuevo producto al socket */
envioProducto.addEventListener('click', (event) => {
    event.preventDefault()
    const addProduct = {
        title: title.value,
        descripcion: description.value,
        price: price.value,
        category: category.value
    }

    SoServer.emit('product', addProduct)
})

// PARA ELIMINAR DE PRODUCTOS____________________________

/* Capturamos el boton de envio para eliminar producto*/
const eliminarProducto = document.querySelector('#elimnarProduct')

/* capturamos el valor del ID*/
const idEliminar = document.querySelector('#productDelete')

/* creamos el evento para enviar la información del nuevo producto al socket */
eliminarProducto.addEventListener('click', (event) => {
    event.preventDefault()
    const idProd = parseInt(idEliminar.value)

    SoServer.emit('eliminar', idProd)
})

/* Actualizamos la vista de la lista de productos*/
SoServer.on('agregarProducto', datos => {

    const contenedor = document.querySelector('#container')
    contenedor.innerHTML = '';

    datos.forEach(element => {
        contenedor.innerHTML += `
                <div>
                    <hr>
                    <h3>PRODUCTO: ${element.title}</h3>
                    <h3>DESCRIPCION: ${element.descripcion}</h3>
                    <h3>PRECIO: ${element.price}</h3>
                    <h3>CATEGORIA: ${element.category}</h3>
                    <hr>
                </div>
        `
    })

})
// ___________________________________________________________


