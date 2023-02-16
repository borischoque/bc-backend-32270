const SoServer = io();
/* Capturamos el boton de envio */
const envioProducto = document.querySelector('#envioProducto')
/* capturamos los valores */
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


/* Agregamos el nuevo producto */
SoServer.on('agregarProducto', datos => {

    const contenedor = document.querySelector('#container')
    contenedor.innerHTML = '';

    datos.forEach(element => {
        contenedor.innerHTML += `
                <div>
                    <hr>
                    <h3>PRODUCTO: ${element.title}</h3>
                    <h3>DESCRIPCION: ${element.descripcion}</h3>
                    <h3>CATEGORIA: ${element.price}</h3>
                    <h3>STOCK: ${element.category}</h3>
                    <hr>
                </div>
        `
    })

})