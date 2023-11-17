const input = document.getElementById("input")
const inputCountries = document.getElementById("input-countries")

let countries = []

const countriesData = async() => {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all")
        if(!res.ok) {
            throw new Error(`Something went wrong ${res.status}`)
        }
        const data = await res.json()
        countries = data
        renderCountries(data[232])
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("load", countriesData)

input.addEventListener("input", (e) => {

inputCountries.innerHTML = "";
  if (e.target.value) {
    let searchCountries = countries.filter((item) =>
      item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (searchCountries.length == 1) {
      renderCountries(searchCountries[0]);
    } else {
      searchCountries.forEach((item) => createElem(item.name.common));
    }
  }
});

function createElem(item) {
  let searchElem = `<span class="list border border-2 rounded-2 p-1" role="button">${item}</span>`;
  inputCountries.innerHTML += searchElem;
}

inputCountries.addEventListener("click", (e) => {
  if (e.target.classList.contains("list")) {
    input.value = e.target.innerText;
    inputCountries.innerHTML = "";
    const filteredCountries = countries.filter(
      (item) => item.name.common == e.target.innerText
    );
    renderCountries(filteredCountries[0]);
  }
});

const renderCountries = (a) => {
    const countriesDiv = document.getElementById("countries-div")
    const {flags, name, region, capital, languages, currencies, population, borders, maps} = a
    countriesDiv.innerHTML = `
    <div class="card w-100">
        <img src="${flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${name.common}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><span class="fw-bold">Region:</span> ${region}</li>
            <li class="list-group-item"><span class="fw-bold">Capitals:</span> ${capital}</li>
            <li class="list-group-item"><span class="fw-bold">Languages:</span> ${Object.values(languages)}</li>
            <li class="list-group-item"><span class="fw-bold">Currencies:</span> ${Object.values(currencies)[0].name}</li>
            <li class="list-group-item"><span class="fw-bold">Population:</span> ${population.toLocaleString("tr")}</li>
            <li class="list-group-item"><span class="fw-bold">Borders:</span> ${borders}</li>
            <li class="list-group-item"><span class="fw-bold">Map:</span> <a href="${maps.googleMaps}" target="_blank">Go to google map</a></li>
        </ul>
    </div>
    `
}


