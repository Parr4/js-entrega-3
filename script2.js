// Declaracion variables modificables
let precioTotal = 0;
let carrito = []
let respaldoStock = ""
let catalogoJson = []
// console.log(catalogoJson)

// Botones
let catalogo = ''
if (document.getElementById('items')) {
    catalogo = document.getElementById('items')
}

let listaCarro = document.getElementById('carrito')
let btnVaciado = document.getElementById('boton-vaciar')
let btnComprar = document.getElementById('boton-comprar')
let valorTotal = document.getElementById('total')


btnVaciado.addEventListener('click', vaciarCarritoBtn)
function vaciarCarritoBtn() {
    carrito = []
    listaCarro.innerHTML = ''
    valorTotal.innerText = 0
    devolverStock()
    if (document.getElementById('items') != null) filtradoCatalogo()
    localStorage.removeItem("catalogoDinamico")
    localStorage.removeItem("carrito")

}

btnComprar.addEventListener('click', comprarCarrito)

// sistema de filtro
let seleccionFiltro = document.querySelector('#seleccion')
if (document.getElementById('items') != null) {
    // console.log("si hay filtro")

    seleccionFiltro.addEventListener('change', filtradoCatalogo)
}
else {
    // console.log("no hay filtro")
}




// codigo
function creacionCodigo(prod) {
    prod.push(prod.codigo = prod.franqId + "." + prod.id,
    prod.nombreCompleto = prod.franquicia + "." + prod.tomo);
    // prod.push(prod.nombreCompleto = prod.franquicia + "." + prod.tomo)
}


function filtradoCatalogo() {
    filtroSeleccionado = document.getElementById('seleccion').value
    // console.log(filtroSeleccionado)
    switch (filtroSeleccionado) {
        case '0':
            catalogoJson.sort((a, b) => a.franquicia.localeCompare(b.franquicia))
            break
        case '1':
            catalogoJson.sort((a, b) => a.precio - b.precio)
            break
        case '2':
            catalogoJson.sort((a, b) => b.precio - a.precio)
            break
        case '3':
            catalogoJson.sort((a, b) => b.id - a.id)
            break
        case '4':
            catalogoJson.sort((a, b) => a.id - b.id)
            break
        case '5':
            catalogoJson.sort((a, b) => b.stock - a.stock)
            break
        case '6':
            catalogoJson.sort((a, b) => a.stock - b.stock)
            break
        default:
            catalogoJson.sort((a, b) => a.franquicia.localeCompare(b.franquicia))
            break
    }
    renderProductos()

}
// catalogoJson = JSON.parse(localStorage.getItem("catalogo"))


function respaldarStock() {
    if (localStorage.getItem("catalogoDinamico") != null) {
        // console.log("hola")
    }
    else {
        // filtradoCatalogo()
        localStorage.setItem("respaldoCatalogo", JSON.stringify(catalogoJson))
        respaldoStock = JSON.parse(localStorage.getItem("respaldoCatalogo"))
        // console.log("Respaldo json: ", respaldoStock)
        // console.log("chao")
    }
}
function devolverStock() {
    catalogoJson = JSON.parse(localStorage.getItem("respaldoCatalogo"))
    // console.log("despues del respaldo:", catalogoJson)
    if (cincoMasNuevos != '') {
        masNuevos()
        masVendidos()

    }
    renderProductos()

}

function agregarProductoCarrito(event) {
    carrito.push(event.target.getAttribute('mark'))
    // console.log(carrito)
    renderCarrito()
    carritoDinamico()
    if (document.getElementById('items') == null) {
        renderDestacados(cincoMasNuevos)
        renderDestacados(cincoMasVendidos)

    }

}

function carritoDinamico() {
    if (document.getElementById('items')) { filtradoCatalogo() }
    localStorage.setItem("catalogoDinamico", JSON.stringify(catalogoJson))
}

function restarStock(item) {
    item.stock = item.stock - 1
    if (document.getElementById('items')) { renderProductos() }
}


function eliminarProducto(event, item, cantidad) {
    let id = event.target.dataset.item
    // console.log(event.target.dataset.item)
    carrito = carrito.filter((carritoId) => {
        // console.log(carrito)
        return carritoId != id
    }
    )


    // console.log(item[0])
    // console.log(cantidad)
    item[0].stock = item[0].stock + cantidad

    // console.log(item)

    renderCarrito()
    renderProductos()
    if (cincoMasNuevos != '') {
        renderDestacados(cincoMasNuevos)
        renderDestacados(cincoMasVendidos)

    }

}


function calcularPrecioTotal() {
    return carrito.reduce((total, itemId) => {
        let item = catalogoJson.filter((producto) => {
            return producto.codigo === itemId
        })

        return total + item[0].precio
    }, 0)
}

function guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function CargarCarritoStorage() {
    if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }
}

function cargarCatalogo() {
    if (localStorage.getItem("catalogoDinamico") !== null) {
        catalogoJson = JSON.parse(localStorage.getItem("catalogoDinamico"))
    }
}

function recargarCatalogo() {
    if (localStorage.getItem("catalogo") == null) {
        localStorage.setItem("catalogo", JSON.stringify(productos))
    }
    else {
        localStorage.setItem("catalogo", JSON.stringify(catalogoJson))
        cargarCatalogo()
    }
}
function comprarCarrito() {
    valorTotalVisible = valorTotal.innerHTML
    if (valorTotalVisible == 0) {
        Swal.fire({
            title: 'Error en la compra',
            text: `El carrito aun esta vacio`,
            icon: 'error',
            confirmButtonText: 'Vamoh a comprar'
        })
    }
    else {
        Swal.fire({
            title: 'Compra realizada',
            text: `El valor total para su compra es: $${valorTotalVisible}`,
            icon: 'success',
            confirmButtonText: 'Llevame al pago'
        })
    }
    // console.log(valorTotalVisible)
    localStorage.removeItem("catalogoDinamico")
    filtradoCatalogo()
    respaldarStock()
    recargarCatalogo()
    renovarCarrito()

}
function renovarCarrito() {
    carrito = []
    listaCarro.innerHTML = ''
    valorTotal.innerText = 0
    localStorage.removeItem("catalogoDinamico")
    localStorage.removeItem("carrito")
}


function cargarJson() {
    if (localStorage.getItem("catalogo") == null) {
        fetch('objetos.json')
            .then((objetos) => objetos.json())
            .then((info) => info.forEach((prod) => {
                if (document.getElementById('items') != null) {
                    filtradoCatalogo()
                    buscador()
                    // Dom
                    let container = document.createElement('div')
                    // añadir un id aqui
                    container.classList.add('card', 'producto', 'col-lg-2', 'col-md-3', 'col-sm-4', 'col-6')
                    // img
                    let img = document.createElement('img')
                    img.classList.add('card-img-top')
                    img.setAttribute('src', `../img/${prod.franquicia}/${prod.id}.jpg`)
                    // body
                    let body = document.createElement('div')
                    body.classList.add('card-body')
                    // titulo
                    let title = document.createElement('h5')
                    title.classList.add('card-title')
                    title.innerText = `${prod.franquicia}` + " - " + `${prod.tomo}`
                    // subtitulo
                    let editorial = document.createElement('h6')
                    editorial.classList.add('card-text', 'editorial')
                    editorial.innerText = `${prod.editorial}`
                    // subtitulo
                    let subtitulo = document.createElement('h6')
                    subtitulo.classList.add('card-text')
                    subtitulo.innerText = `$${prod.precio}` + ` (Stock: ${prod.stock})`
                    // boton
                    let botonAñadir = document.createElement('button')
                    botonAñadir.classList.add('btn', 'btn-primary')
                    botonAñadir.innerText = `Añadir al carro`
                    botonAñadir.setAttribute('mark', prod.codigo)
                    botonAñadir.addEventListener('click', comprobarStock)

                    function comprobarStock(event) {
                        if (prod.stock <= 0) {
                            // alert("no tenemos este producto!")
                            Swal.fire({
                                title: 'Error',
                                text: 'No tenemos este producto actualmente en stock',
                                icon: 'error',
                                confirmButtonText: ' :C '
                            })
                        }
                        else {
                            restarStock(prod)
                            agregarProductoCarrito(event)
                            // console.log("agregado")
                        }
                    }

                    body.append(title)
                    body.append(editorial)
                    body.append(subtitulo)
                    body.append(botonAñadir)
                    container.append(img)
                    container.append(body)
                    catalogo.append(container)
                }


            }, localStorage.setItem("catalogo", JSON.stringify(info)), catalogoJson = JSON.parse(localStorage.getItem("catalogo")), cargarCodigos()))
            .then()

            // .then(console.log("ACA!", catalogoJson))
            .then()
    }
    else {
        catalogoJson = JSON.parse(localStorage.getItem("catalogo"))
        cargarCodigos()

    }
    // .then(catalogoJson.forEach(prod => catalogoJson.push(prod.codigo = prod.franqId + "." + prod.id)))


}


cargarJson()
function cargarCodigos() {
    catalogoJson.forEach(prod => prod.codigo = prod.franqId + "." + prod.id)
    catalogoJson.forEach(prod => prod.nombreCompleto = prod.franquicia + " " + prod.tomo)

    // console.log(catalogoJson)
}
CargarCarritoStorage()
cargarCatalogo()
renderCarrito()
respaldarStock()

function renderProductos() {
    if (localStorage.getItem("catalogo") != null) {
        if (document.getElementById('items') != null) {
            filtradoCatalogo
            catalogo.innerHTML = ''


            catalogoJson.forEach((prod) => {
                // console.log(prod)
                let container = document.createElement('div')
                container.setAttribute('id', `${prod.nombreCompleto}`)
                container.classList.add('card', 'producto', 'col-lg-2', 'col-md-3', 'col-sm-4', 'col-6')
                if(!prod.nombreCompleto.toUpperCase().includes(input)){
                    container.classList.add('hidden')
                }
                // console.log('input', input,"objeto", prod.nombreCompleto.toUpperCase())
                
                container.setAttribute('id',`${prod.franquicia}${prod.tomo}`)
                // img
                let img = document.createElement('img')
                img.classList.add('card-img-top')
                img.setAttribute('src', `../img/${prod.franquicia}/${prod.id}.jpg`)
                // body
                let body = document.createElement('div')
                body.classList.add('card-body')
                // titulo
                let title = document.createElement('h5')
                title.classList.add('card-title')
                title.innerText = `${prod.franquicia}` + " - " + `${prod.tomo}`
                // subtitulo
                let editorial = document.createElement('h6')
                editorial.classList.add('card-text', 'editorial')
                editorial.innerText = `${prod.editorial}`
                // subtitulo
                let subtitulo = document.createElement('h6')
                subtitulo.classList.add('card-text')
                subtitulo.innerText = `$${prod.precio}` + ` (Stock: ${prod.stock})`
                // boton
                let botonAñadir = document.createElement('button')
                botonAñadir.classList.add('btn', 'btn-primary')
                botonAñadir.innerText = `Añadir al carro`
                botonAñadir.setAttribute('mark', prod.codigo)
                botonAñadir.addEventListener('click', comprobarStock)

                function comprobarStock(event) {
                    if (prod.stock <= 0) {
                        // alert("no tenemos este producto!")
                        Swal.fire({
                            title: 'Error',
                            text: 'No tenemos este producto actualmente en stock',
                            icon: 'error',
                            confirmButtonText: ' :C '
                        })
                    }
                    else {
                        restarStock(prod)
                        agregarProductoCarrito(event)
                    }
                }

                body.append(title)
                body.append(editorial)
                body.append(subtitulo)
                body.append(botonAñadir)
                container.append(img)
                container.append(body)
                catalogo.append(container)

            }
            )
        }
    }
}

function renderCarrito() {
    guardarCarritoStorage()

    listaCarro.innerHTML = ''

    let carritoSinRepetidos = [...new Set(carrito)]

    carritoSinRepetidos.forEach((itemId) => {
        let item = catalogoJson.filter((producto) => {
            // console.log(itemId)
            // console.log(producto.codigo)
            return producto.codigo === itemId
        })

        let cantidad = carrito.reduce((total, id) => {
            return id === itemId ? total += 1 : total
        }, 0)

        let container = document.createElement('div')
        container.classList.add('row', 'cart-item')

        let linea = document.createElement('li')
        linea.classList.add('list-group-item', 'text-right', 'mx-12', 'col')
        linea.innerText = `${cantidad} x ${item[0].franquicia} ${item[0].tomo} - $${item[0].precio}`
        let img = document.createElement('img')
        img.classList.add('img-cart', 'img-fluid', 'col')
        img.setAttribute('src', `../img/${item[0].franquicia}/${item[0].id}.jpg`)

        let botonEliminar = document.createElement('button')
        botonEliminar.classList.add('btn', 'btn-danger', 'mx-2')
        botonEliminar.innerText = 'X'
        botonEliminar.dataset.item = itemId
        botonEliminar.setAttribute('mark', itemId)
        botonEliminar.addEventListener('click', () => { eliminarProducto(event, item, cantidad) })

        listaCarro.append(container)
        container.append(img)
        container.append(linea)
        linea.append(botonEliminar)




    })

    valorTotal.innerText = calcularPrecioTotal()
    // valorTotal = calcularPrecioTotal()
    valorTotalVisible = valorTotal.innerHTML

}

let cincoMasVendidos = ''
function masVendidos() {
    if (catalogo !== null) {
        catalogoJson.sort((a, b) => b.stock - a.stock)
        cincoMasVendidos = catalogoJson.slice(0, 5)
        // console.log("Recorte mas vendidos", cincoMasVendidos)
        renderDestacados(cincoMasVendidos)
    }
}

let cincoMasNuevos = ''
function masNuevos() {
    if (catalogo !== null) {
        catalogoJson.sort((a, b) => b.tomo - a.tomo)
        cincoMasNuevos = catalogoJson.slice(0, 5)
        // console.log("Recorte nuevos", cincoMasNuevos)
        renderDestacados(cincoMasNuevos)
    }
}

function renderDestacados(seccion) {
    if (document.getElementById('items') == null) {
        if (seccion == cincoMasNuevos) {
            let = apartado = document.getElementById('cincoMasNuevos')
            // console.log("EEEEEE")
        } else if (seccion == cincoMasVendidos) {
            let = apartado = document.getElementById('cincoMasVendidos')
            // console.log("AAAAAA")
        }
        // else { console.log("Aqui no hay nada") }

        apartado.innerHTML = ''

        seccion.forEach((prod) => {
            let container = document.createElement('div')
            container.classList.add('card', 'producto', 'col-lg-2', 'col-md-3', 'col-sm-4', 'col-6')
            // img
            let img = document.createElement('img')
            img.classList.add('card-img-top')
            img.setAttribute('src', `../img/${prod.franquicia}/${prod.id}.jpg`)
            // body
            let body = document.createElement('div')
            body.classList.add('card-body')
            // titulo
            let title = document.createElement('h5')
            title.classList.add('card-title')
            title.innerText = `${prod.franquicia}` + " - " + `${prod.tomo}`
            // subtitulo
            let editorial = document.createElement('h6')
            editorial.classList.add('card-text', 'editorial')
            editorial.innerText = `${prod.editorial}`
            // subtitulo
            let subtitulo = document.createElement('h6')
            subtitulo.classList.add('card-text')
            subtitulo.innerText = `$${prod.precio}` + ` (Stock: ${prod.stock})`
            // boton
            let botonAñadir = document.createElement('button')
            botonAñadir.classList.add('btn', 'btn-primary')
            botonAñadir.innerText = `Añadir al carro`
            botonAñadir.setAttribute('mark', prod.codigo)
            botonAñadir.addEventListener('click', comprobarStock)

            function comprobarStock(event) {
                if (prod.stock <= 0) {
                    // alert("no tenemos este producto!")
                    Swal.fire({
                        title: 'Error',
                        text: 'No tenemos este producto actualmente en stock',
                        icon: 'error',
                        confirmButtonText: ' :C '
                    })
                }
                else {
                    restarStock(prod)
                    agregarProductoCarrito(event)
                }
            }

            body.append(title)
            body.append(editorial)
            body.append(subtitulo)
            body.append(botonAñadir)
            container.append(img)
            container.append(body)
            apartado.append(container)

        }
        )
    }
}

let input = ''
function buscador() {
    input = document.getElementById('buscador').value
    input=input.toUpperCase();
    renderProductos()

    // console.log(input)
}

setTimeout(() => {
    if (document.getElementById('items') != null) { filtradoCatalogo() }
    else {
        masVendidos()
        masNuevos()
    }
    renderProductos()
    respaldarStock()

}, 2000)

console.log("github me esta dando este error con el fetch, le dejo el proyecto subido en otro host https://shamanmangastore.000webhostapp.com/")
// console.log(catalogoJson)