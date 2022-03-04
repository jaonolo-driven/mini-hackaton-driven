const API_KEY = 'a4a6cf5e94ce0a7ecbec528d2258e393'

const getWeather = (location) => {
    if(!location) {
        console.error('deu ruim')
        return 1
    }

    const lat = location.coords.latitude
    const lon = location.coords.longitude

    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then((response) => renderWeather(response.data))
        .catch(() => alert("Falha ao tentar encontrar informações de clima! Tente novamente"))
}

const getGeolocationBrowser = () => navigator.geolocation.getCurrentPosition(
    (response) => {
        getWeather(response)
    },
    () => {alert("Falha ao ler localização do navegador")}
)

const getGeolocationSearch = (query) => {
    axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`)
        .then((response) => {
             parseLocationList(response.data)
        })
        .catch(() => alert("Não foi possível encontrar local especificado! Tente novamente"))
}

const parseLocationList = (locations) => {
    locations.forEach((location) => getWeather({coords: {latitude: location.lat, longitude: location.lon}}))
}

const renderWeather = (results) => {

    [...document.querySelectorAll('.hidden')].forEach((element) => element.classList.remove('hidden'));
    [...document.querySelectorAll('main :not(section)')].forEach((element) => element.classList.add('hidden'))

    const container = document.querySelector('section')
    container.innerHTML = `
        <h1>${results.name}</h1>
        <div class="results-data">
            <div class="results-main">
                <img src='https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png' alt="weather-icon">
                <p>${results.weather[0].main}</p>
            </div>
            <div class="results-status">
                <p>Temperatura atual: ${(results.main.temp - 273.15).toFixed(2)}°C</p>
                <p>Sensação térmica: ${(results.main.feels_like - 273.15).toFixed(2)}°C</p>
                <p>Humidade do ar: ${results.main.humidity}%</p>
            </div>
        </div>

    `
}