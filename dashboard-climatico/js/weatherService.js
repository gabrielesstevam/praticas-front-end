// imports ///////////////////////////////////////////
import * as UI from "./ui.js"

// class ///////////////////////////////////////////
class citySearch { // objeto para construção da cidade e sua documentação completa
    constructor (json){
        this.image = () => {
            const id = json.weather[0].id
            const roteImage = "./assets/images/"

            if (id >= 200 && id <= 232) {
                return `${roteImage}tempest.jpg`;
            } else if (id >= 300 && id <= 321) {
                return `${roteImage}drizzle.jpg`
            } else if (id >= 500 && id <= 531) {
                return `${roteImage}rain.jpg`
            } else if (id >= 600 && id <= 622) {
                return `${roteImage}snow.jpg`
            } else if (id == 701) {
                return `${roteImage}mist.jpg`
            } else if (id == 711) {
                return `${roteImage}smoke.jpg`
            } else if (id == 721) {
                return `${roteImage}mist.jpg`
            } else if (id == 731) {
                return `${roteImage}tornado-sand.jpg`
            } else if (id == 741) {
                return `${roteImage}mist.jpg`
            } else if (id == 751) {
                return `${roteImage}sand.jpg`
            } else if (id == 761) {
                return `${roteImage}sand.jpg`
            } else if (id == 762) {
                return `${roteImage}volcanic.jpg`
            } else if (id == 771) {
                return `${roteImage}wind-force.jpg`
            } else if (id == 781) {
                return `${roteImage}tornado.jpg`
            } else if (id == 800) {
                return `${roteImage}clear.jpg`
            } else if (id >= 801 && id <= 804) {
                return `${roteImage}clouds.jpg`
            } else {
                return "n/a"
            }
        }
        this.name = json.name
        this.country = json.sys.country
        
        this.temp = json.main.temp
        this.tempMax = json.main.temp_max
        this.tempMin = json.main.temp_min
        this.humidity = json.main.humidity
        this.pressure = json.main.pressure
        this.windSpeed = json.wind.speed
        this.pressure = json.main.pressure
    }
}
class cityFixed { // objeto para construção da cidade fixada
    constructor (json){
        this.name = json.name
        this.country = json.sys.country
        this.temp = json.temp
    }
}

// function ///////////////////////////////////////////
export async function saveCityDocument(cityName) {
    try {
        const searchLocal = JSON.parse(localStorage.getItem("searchStorage")) || {}
        for (const i in searchLocal){ // verifica se ja foi armazenada
            if (searchLocal[i].name.toLowerCase() == cityName.toLowerCase()){ throw new Error(`Os dados de ${cityName} ja estão armazenados`)}}
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=42064ff7a59c148d8dbfe2b9bdf4b7cf`)
        if (!response.ok){ // verifica os erros na requisição
            if (response.status === 404) {
                throw new Error("Cidade não encontrada");
            } else if (response.status === 401) {
                throw new Error("Chave de API inválida");
            } else if (response.status === 429) {
                throw new Error("Limite de requisições excedido");
            } else {
                throw new Error(`Erro inesperado na requisição: ${response.status}`);
            }
        }
        const responseJSON = await response.json()
        const city = new citySearch(responseJSON)
        searchLocal[responseJSON.name] = city

        UI.makeItemStorage(city)

        localStorage.setItem("searchStorage", JSON.stringify(searchLocal))

        UI.alert(`${cityName} foi armazenada corretamente`)

    } catch (erro) {
        UI.warn(erro)
    }
}