// DOM elements
const countryContainerNode = document.getElementById('country-container')
const backButtonNode = document.getElementById('back-button')

// Event Listeners
document.addEventListener('DOMContentLoaded', loadCountryInfo)
backButtonNode.addEventListener('click', function () {
    window.history.back()
})


// Global Variables
let countryCode = ''


// Functions
async function loadCountryInfo() {
    countryCode = getCountryCodeFromURL()
    const countries = await getCountries() 
    const countryInfo = countries.find(country => country.alpha3Code == countryCode)
    const { borders = [] } = countryInfo
    const borderCountries = getBorderCountries(countries, borders)
    addCountry(countryInfo, borderCountries)
}

function getBorderCountries(countries, borders){
    let countriesFiltered = countries.filter(country => borders.includes(country.alpha3Code))
    let borderCountries = countriesFiltered.map(country => ({ name: country.name, code: country.alpha3Code }) )
    return borderCountries
}


function getCountryCodeFromURL(){
    let URLParams = new URLSearchParams(window.location.search)
    return URLParams.get('countryCode')
}
 
async function getCountries() {
    let countries
    await fetch('data.json')
        .then(response => response.json())
        .then(json => {
            countries = json
        })
    return countries
}

function addCountry(country, borders) {
    const { flag, name, nativeName, population, region, subregion, capital, currencies, topLevelDomain, languages } = country

    let countryDescription = `
        <img src="${flag}" alt="flag of ${name}" class="flag-details"/>
        <div class="country-description-details">
            <h2>${name}</h2>
            <div class="details">
                <div class="primary-details" id="primary-details">
                    <small><span>Native Name: </span>${nativeName}</small><br/>
                    <small><span>Population: </span>${population}</small><br/>
                    <small><span>Region: </span>${region}</small><br/>
                    <small><span>Sub Region: </span>${subregion}</small><br/>
                    ${ capital ? `<small><span>Capital: </span>${capital}</small>` : ""}
                </div>
                <div class="secondary-details" id="secondary-details">
                    <small><span>Top Level Domain: </span>${topLevelDomain}</small><br/>
                    ${
                        currencies ? 
                        `<small id='currencies'><span>Currencies: </span>${currencies?.map(currency => currency.name).join(", ")}</small></br>`
                        : ""
                    }
                    <small id='languages'><span>Languages:</span> ${ languages.map(language => language.name).join(", ")}</small>
                </div>
            </div>
            ${
                borders.length != 0 ?
                `
                <div class="border-countries" id="border-countries">
                <small><span>Border Countries: </span></small><br/>
                ${
                    borders.map(border => {
                        return `<a href='details.html?countryCode=${border.code}'>${border.name}</a>`
                    })
                }
                </div>
                `
                : ""
            } 
            
        </div>
    `
    countryContainerNode.innerHTML = countryDescription
}


