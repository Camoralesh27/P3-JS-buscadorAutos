//* VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

/* const max = new Date().getFullYear(); */ //obtiene el año actual, pero lo cambié porque se hizo en 2020 
const max = 2020;
const min = max - 10; //porque la agencia no vende autos de mas de 10 años

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//* EVENTOS 
document.addEventListener('DOMContentLoaded', () => {
    //una vez que carga el HTML llama la función mostrarAutors() para mostrar los automoviles 
    mostrarAutos(autos); 
    //Llena las opciones de años
    llenarSelect();
});

//* Event listener para los select de busqueda 
marca.addEventListener ('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener ('change', e => {
    datosBusqueda.year = parseInt(e.target.value); //parseint convierte el string en un number porque los formularios mandan los numeros como string
    filtrarAuto();
});

minimo.addEventListener ('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

maximo.addEventListener ('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

puertas.addEventListener ('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener ('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener ('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

//* FUNCIONES
function mostrarAutos(autos) {

    limpiarHTML(); //elimina el HTML previo

    //Iterar sobre los autos y construir el template
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto; //destructuring, para en vez de poner en autoHTML 'auto.marca', solo poner 'marca'
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio ${precio} - Color: ${color}
        `;


        //* Insertar en el HTML
        resultado.appendChild(autoHTML);
    }) 
}

//Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {
    for(let i = max; i >= min; i--) { //corre alreves para que se muestre primero el año mas reciente
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select
    }
}

//! Funcion de alto nivel (porque tiene funciones dentro, lláma a otras funciones)
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter( filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); //tiene chaining para llamar a las diferentes funciones de filtrado
    
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';

    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    //sin destructuring
    /* if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    } */

    const {marca} = datosBusqueda; //destructuring
    if(marca) {
            return auto.marca === marca;
    }
    return auto; //por si no a elegido el usuario algun filtro, se trae todos los carros
}

function filtrarYear(auto) {
    const {year} = datosBusqueda; //destructuring
    if(year) {
            return auto.year === year; 
    }
    return auto; 
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda; //destructuring
    if(minimo) {
            return auto.precio >= minimo; //da los valores que son mayores o igual a minimo 
    } //aunque mi minimo ubiera sido string, no hubiera habido problema porque el >= no es estricto como ===
    return auto; 
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda; //destructuring
    if(maximo) {
            return auto.precio <= maximo; 
    }
    return auto; 
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda; //destructuring
    if(puertas) {
            return auto.puertas === puertas; 
    }
    return auto; 
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda; //destructuring
    if(transmision) {
            return auto.transmision === transmision; 
    }
    return auto; 
}

function filtrarColor(auto) {
    const {color} =datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}