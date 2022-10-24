// productos
// Los precios de los mangas usualmente se comparten entre tomos de la misma franquicia, con leves excepciones


// Funciones
// constructores
class Producto {
    constructor(franqId, id, franquicia, tomo, stock, precio) {
        this.franqId = franqId
        this.id = id
        this.franquicia = franquicia
        this.tomo = tomo
        this.stock = stock
        this.precio = precio
        this.codigo = this.franqId + `.` + this.id
    }

    restarStock(listado, objetos) {
        this.stock = this.stock - 1;
        actualizar(listado, objetos);
        carroCompra.push(this);
    }
}

class Franquicia {
    constructor(id, nombre, editorial, precio) {
        this.id = id
        this.nombre = nombre
        this.editorial = editorial
        this.precio = precio
    }
}
// funciones de acciones

// Generador de listado de productos
function armadoLista(objetos, listado) {
    for (const tomo of objetos) {
        listado.push("\n" + tomo.id + ".- " + tomo.franquicia + " " + tomo.tomo + " (" + tomo.stock + ") $" + tomo.precio)
    }
}


// franquicias para el menu
let menuA = new Franquicia("1", "Shaman King", "Editorial Panini Mexico", 16990)
let menuB = new Franquicia("2", "Vinland Saga", "Editorial OvniPress", 14990)
let menuC = new Franquicia("3", "Tokyo Revengers", "Ivrea Argentina", 9990)

let franquicias = [menuA, menuB, menuC];
let listaFranquicias = []

for (const franq of franquicias) {
    listaFranquicias.push("\n" + franq.id + ".- " + franq.nombre + " " + franq.editorial + " $" + franq.precio)
}

// Productos shaman king
let shmkPan1 = new Producto(franquicias[0].id, "1", franquicias[0].nombre, "Tomo 1", 15, franquicias[0].precio);
let shmkPan2 = new Producto(franquicias[0].id, "2", franquicias[0].nombre, "Tomo 2", 3, franquicias[0].precio);
let shmkPan3 = new Producto(franquicias[0].id, "3", franquicias[0].nombre, "Tomo 3", 5, franquicias[0].precio);
let shmkPan4 = new Producto(franquicias[0].id, "4", franquicias[0].nombre, "Tomo 4", 0, franquicias[0].precio);
let shmkPan5 = new Producto(franquicias[0].id, "5", franquicias[0].nombre, "Tomo 5", 12, franquicias[0].precio);
let productoShmkPan = [shmkPan1, shmkPan2, shmkPan3, shmkPan4, shmkPan5];
let listaShmkPan = []

armadoLista(productoShmkPan, listaShmkPan)


// Vinland saga - Ovnipress
let vdsgOp = "Vinland Saga - Ovnipress Argentina - $15.490 c/u";
const vdsgOpPrecio = 15490;

let vdsgOp1 = new Producto(franquicias[1].id, "1", franquicias[1].nombre, "Tomo 1", 10, franquicias[1].precio);
let vdsgOp2 = new Producto(franquicias[1].id, "2", franquicias[1].nombre, "Tomo 2", 2, franquicias[1].precio);
let vdsgOp3 = new Producto(franquicias[1].id, "3", franquicias[1].nombre, "Tomo 3", 5, franquicias[1].precio);
let vdsgOp4 = new Producto(franquicias[1].id, "4", franquicias[1].nombre, "Tomo 4", 1, franquicias[1].precio);
let vdsgOp5 = new Producto(franquicias[1].id, "5", franquicias[1].nombre, "Tomo 5", 15, franquicias[1].precio);
let productoVdsgOp = [vdsgOp1, vdsgOp2, vdsgOp3, vdsgOp4, vdsgOp5];
let listaVdsgOP = []

armadoLista(productoVdsgOp, listaVdsgOP)

// Tokyo Revengers - Ivrea Argentina
let tkrvIvr = "Tokyo Revengers - Ivrea Argentina - $9.990 c/u";
const tkrvIvrPrecio = 9990;

let tkrvIvr1 = new Producto(franquicias[2].id, "1", franquicias[2].nombre, "Tomo 1", 8, franquicias[2].precio);
let tkrvIvr2 = new Producto(franquicias[2].id, "2", franquicias[2].nombre, "Tomo 2", 7, franquicias[2].precio);
let tkrvIvr3 = new Producto(franquicias[2].id, "3", franquicias[2].nombre, "Tomo 3", 12, franquicias[2].precio);
let tkrvIvr4 = new Producto(franquicias[2].id, "4", franquicias[2].nombre, "Tomo 4", 4, franquicias[2].precio);
let tkrvIvr5 = new Producto(franquicias[2].id, "5", franquicias[2].nombre, "Tomo 5", 22, franquicias[2].precio);
let productoTkrvIvr = [tkrvIvr1, tkrvIvr2, tkrvIvr3, tkrvIvr4, tkrvIvr5];
let listaTkrvIvr = []

armadoLista(productoTkrvIvr, listaTkrvIvr)

let productos = [...productoShmkPan, ...productoTkrvIvr, ...productoVdsgOp]
// localStorage.setItem("catalogo", JSON.stringify(productos))
// recargarCatalogo()

let catalogoJson = JSON.parse(localStorage.getItem("catalogo"))
console.log(catalogoJson)
recargarCatalogo()
catalogoJson = JSON.parse(localStorage.getItem("catalogo"))




console.log(productos)
// fin de los productos

let tomo = 0;
let precioTotal = 0;
let carrito = []
let respaldoStock = []


let catalogo = document.getElementById('items')
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
    localStorage.removeItem("catalogoDinamico")
    localStorage.removeItem("carrito")
}

btnComprar.addEventListener('click', comprarCarrito)



CargarCarritoStorage()
cargarCatalogo()
renderCarrito()
respaldarStock()




function renderProductos() {
    catalogo.innerHTML = ''

    catalogoJson.forEach((prod) => {
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
        editorial.classList.add('card-text')
        editorial.innerText = "Añadir editorial luego"
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
renderProductos()

// let respaldoStock = ""
function respaldarStock() {
    if (localStorage.getItem("catalogoDinamico") != null) {
        console.log("hola")
    }
    else {
        localStorage.setItem("respaldoCatalogo", JSON.stringify(catalogoJson))
        respaldoStock = JSON.parse(localStorage.getItem("respaldoCatalogo"))
        console.log("Respaldo json: ", respaldoStock)
        console.log("chao")
    }
}
function devolverStock() {
    catalogoJson = JSON.parse(localStorage.getItem("respaldoCatalogo"))
    console.log("despues del respaldo:", catalogoJson)
    renderProductos()
}

function agregarProductoCarrito(event) {
    carrito.push(event.target.getAttribute('mark'))
    console.log(carrito)
    renderCarrito()
    carritoDinamico()
}

function carritoDinamico() {
    localStorage.setItem("catalogoDinamico", JSON.stringify(catalogoJson))
}

function restarStock(item) {
    item.stock = item.stock - 1
    renderProductos()
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

        let linea = document.createElement('li')
        linea.classList.add('list-group-item', 'text-right', 'mx-2')
        linea.innerText = `${cantidad} x ${item[0].franquicia} ${item[0].tomo} - $${item[0].precio}`

        let botonEliminar = document.createElement('button')
        botonEliminar.classList.add('btn', 'btn-danger', 'mx-5')
        botonEliminar.innerText = 'X'
        botonEliminar.dataset.item = itemId
        botonEliminar.setAttribute('mark', itemId)
        botonEliminar.addEventListener('click', ()=>{eliminarProducto(event, item, cantidad)})


        linea.append(botonEliminar)
        listaCarro.append(linea)

    })
    
    valorTotal.innerText = calcularPrecioTotal()
    // valorTotal = calcularPrecioTotal()
    valorTotalVisible = valorTotal.innerHTML
    
}

function sumarStock(item, cantidad) {
    console.log(item.stock)
    console.log(cantidad)
    item.stock = item.stock + cantidad
    renderCarrito
}
function eliminarProducto(event, item, cantidad) {
    let id = event.target.dataset.item
    console.log(event.target.dataset.item)
    carrito = carrito.filter((carritoId) => {
        console.log(carrito)
        return carritoId != id
    })


    console.log(item[0])
    console.log(cantidad)
    item[0].stock = item[0].stock + cantidad
    
    console.log(item)

    renderCarrito()
    renderProductos()
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
function comprarCarrito(){
    valorTotalVisible = valorTotal.innerHTML
    if(valorTotalVisible == 0){
        Swal.fire({
            title: 'Error en la compra',
            text: `El carrito aun esta vacio`,
            icon: 'error',
            confirmButtonText: 'Vamoh a comprar'
        })
    }
    else{
    Swal.fire({
        title: 'Compra realizada',
        text: `El valor total para su compra es: $${valorTotalVisible}`,
        icon: 'success',
        confirmButtonText: 'Llevame al pago'
    })}
    console.log(valorTotalVisible)
    localStorage.removeItem("catalogoDinamico")
    // respaldarStock
    recargarCatalogo()
    renovarCarrito()
}

function recargarCatalogo(){
    if (localStorage.getItem("catalogo") == null){
        localStorage.setItem("catalogo", JSON.stringify(productos))
    }
    else{
        localStorage.setItem("catalogo", JSON.stringify(catalogoJson))
        cargarCatalogo()
    }}

function renovarCarrito(){
    carrito = []
    listaCarro.innerHTML = ''
    valorTotal.innerText = 0
    localStorage.removeItem("catalogoDinamico")
    localStorage.removeItem("carrito")
}