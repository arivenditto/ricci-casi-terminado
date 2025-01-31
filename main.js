const carrito = document.getElementById('carrito');
const elemntos1 = document.getElementById('lista-1');
const elemntos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

cargarEventListeners();

function cargarEventListeners() {
    elemntos1.addEventListener('click', comprarElemento);
    elemntos2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemnto = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        marco: elemento.querySelector('img').src,
        medida: elemnto.querySelector('h3').textContent,
        lamina: elemnto.querySelector('.precio').textContent,
        id: elemnto.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {

    const row = document.createElement('tr');
    row.innerHTML = `
                        <td>
                            $(elemento.marco)
                        </td>
                        <td>
                             $(elemento.medida)
                        </td>
                        <td>
                             $(elemnto.lamina)
                        </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e){
    e.preventDefault();
    let elemnto,
        elementoId;
    if(e.target.classList.contains('vaciar-carrito')){
        e.target.parentElement.parentElement.remove();
        elemnto = e.target.parentElement.parentElement;
        elementoId= elemento.querySelector('a').getAttribute('data-id');
    }
}

function vaciarCarrito(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    return false;
}