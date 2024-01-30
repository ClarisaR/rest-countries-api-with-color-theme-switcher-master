const nodoMode = document.getElementById('mode')
const nodoImgMode = document.getElementById('img-mode')
const nodoCountries = document.getElementById('countries')
const nodoFiltroContinentes = document.getElementById('filtro-continentes')
const nodoSearchCountry = document.getElementById('search-country')
const nodoPais = document.getElementById('country-container')

let paises = [];

nodoMode.addEventListener('click', cambiarModo)
window.addEventListener('DOMContentLoaded', cargarPaises)
nodoFiltroContinentes.addEventListener('change', filtrarPaises)
nodoSearchCountry.addEventListener('input', searchCountry)

function cambiarModo() {
    if (nodoMode.innerText == 'Light mode') {
        nodoMode.removeChild(nodoMode.firstChild)
        nodoMode.innerText = 'Dark mode'
        nodoImgMode.src = 'images/moon-dark-theme.svg'
    } else {
        nodoMode.removeChild(nodoMode.firstChild)
        nodoMode.innerText = 'Light mode'
        nodoImgMode.src = 'images/light-mode.svg'
    }
}

function cargarPaises() {
    fetch('data.json')
        .then(response => response.json())
        .then(json => { 
            paises = json
            agregarPaisesAlDOM(paises)
        })
        .catch(error => nodoCountries.innerHTML = `<h2>Hubo un error al cargar los paises</h2>`)
}

function agregarPaisesAlDOM(paises) {
    nodoCountries.innerHTML = ""
    paises.forEach(pais => agregarPais(pais))
}

function agregarPais(pais) {
    const { flag, alpha3Code, name, population, region, capital } = pais
    const nodoPais = document.createElement('section')
    nodoPais.classList = 'country-container'
    nodoPais.id = 'country-container'
    const contenidoPais =
        `<img src="${flag}" alt="flag of ${name}" class="flag"/>
                <div class="country-description">
                    <h4>${name}</h4>
                    <small><span>Population: </span>${population}</small><br/>
                    <small><span>Region: </span>${region}</small><br/>
                    ${ capital ? `<small><span>Capital: </span>${capital}</small>` : ""}
                    
                </div>`

    nodoPais.innerHTML = contenidoPais
    nodoCountries.appendChild(nodoPais)
    nodoPais.addEventListener('click', () => redirigirADetalles(alpha3Code))
}

function redirigirADetalles(code) {
    window.location.href = 'details.html?countryCode=' + code;
}

function filtrarPaises(evento) {
    let paisesFiltrados = paises.filter(pais => pais.region == evento.target.value)
    agregarPaisesAlDOM(paisesFiltrados)
}

let idTimeout


function searchCountry(evento) {
    clearTimeout(idTimeout)
    idTimeout = setTimeout(() => {
        let paisABuscar = evento.target.value.toUpperCase()
        let paisesFiltrados = paises.filter(pais => pais.name.toUpperCase().includes(paisABuscar))
        agregarPaisesAlDOM(paisesFiltrados)
    }, 1000)
}




