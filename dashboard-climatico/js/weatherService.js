// class ---------------------------------

export class weather {
    #keyAPI = "42064ff7a59c148d8dbfe2b9bdf4b7cf"

    searchWeather(city) {
        const cityName = city.toLowwerCase()
        for (const chave in city.citySearch){
            if (city.citySearch.chave.name.toLowwerCase == cityName){
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.#keyAPI}`)
                .then((response) => {return response.json})
                .then((responseJSON) => {new city(responseJSON); return true})
                .catch((error => {
                    return [false, "Cidade não foi encontrada"]
                }))
            } else {
                return [false, "Cidade ja está armazenada"]
            }
        }
    }
}
class city {
    constructor (json){
        this.typeClimatic = () => {
            const id = json.weather[0].id

            if (id >= 200 && id <= 232) {
                return "Tempestade";
            } else if (id >= 300 && id <= 321) {
                return "Garoa";
            } else if (id >= 500 && id <= 531) {
                return "Chuva";
            } else if (id >= 600 && id <= 622) {
                return "Neve";
            } else if (id == 701) {
                return "Névoa";
            } else if (id == 711) {
                return "Fumaça";
            } else if (id == 721) {
                return "Bruma";
            } else if (id == 731) {
                return "Redemoinho de areia";
            } else if (id == 741) {
                return "Nevoeiro";
            } else if (id == 751) {
                return "Areia";
            } else if (id == 761) {
                return "Poeira";
            } else if (id == 762) {
                return "Cinza vulcânica";
            } else if (id == 771) {
                return "Rajada de vento";
            } else if (id == 781) {
                return "Tornado";
            } else if (id == 800) {
                return "Céu Limpo";
            } else if (id >= 801 && id <= 804) {
                return "Céu Limpo";
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

        localStorage.setItem("citySearch", {[this.name]: JSON.stringify(this)})
    }
}
