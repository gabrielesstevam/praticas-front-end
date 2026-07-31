// variables ///////////////////////////////////////////
const modais_element = {
    fixed:document.querySelector(".container-modal-fix"),
    document:document.querySelector(".container-modal-description")
}
const pop_pups_element = {
    alertInterface:document.querySelector(".alert"),
    warnInterface:document.querySelector(".warn")
}

// pop-up functions ///////////////////////////////////////////
export function alert(mensage){
    pop_pups_element.alertInterface.innerHTML = mensage
    open(pop_pups_element.alertInterface)
    setTimeout(() => {
        close(pop_pups_element.alertInterface)
    }, 2000);
}
export function warn(mensage){
    pop_pups_element.warnInterface.innerHTML = mensage
    open(pop_pups_element.warnInterface)
    setTimeout(() => {
        close(pop_pups_element.warnInterface)
    }, 2000);
}

// theme functions ///////////////////////////////////////////
export function themeLoad(){ // carrega o tema
    const theme = localStorage.getItem("themeStorage") || "light"
    switch (theme){
        case("light"):{
            themeModify("light")
            break
        }
        case("dark"):{
            themeModify("dark")
            break
        }
    }
}
export function themeSwitch(){ // troca o tema
    const theme = localStorage.getItem("themeStorage")
    switch (theme){
        case("light"):{
            themeModify("dark")
            break
        }
        case("dark"):{
            themeModify("light")
            break
        }
    }
}
function themeModify(theme) { // modifica o tema
    const textTheme = document.getElementById("button-theme")

    let bodyClass = document.body.classList
    if (theme == "light"){
        bodyClass.remove("darkMode")
        textTheme.innerHTML = "Modo Escuro"
    } else {
        bodyClass.add("darkMode")
        textTheme.innerHTML = "Modo Claro"
    }
    document.querySelector(".wallpaper-video").src = `assets/videos/${theme}-mode.webm`
    localStorage.setItem("themeStorage", theme)
}

// modais_element functions ///////////////////////////////////////////
export function modal(modal, targetId) {
    if (modais_element[modal].classList.contains("closed")){
        open(modais_element[modal])
    } else if (modais_element[modal].classList.contains("opened")){
        close(modais_element[modal])
    }
}
function open(UIelement){
    UIelement.classList.add("emerge")
    setTimeout(() => {
        UIelement.classList.remove("closed")
        UIelement.classList.add("opened")
        UIelement.classList.remove("emerge")
    }, 200);
}
function close(UIelement){
    UIelement.classList.add("disappear")
    setTimeout(() => {
        UIelement.classList.remove("opened")
        UIelement.classList.add("closed")
        UIelement.classList.remove("disappear")
    }, 200);
}
function closeAll(UIelement){
    if (UIelement == "modal"){
        for (const chave in modais_element){
            modais_element[chave].classList.add("disappear")
        }
        setTimeout(() => {
            for (const chave in modais_element){
                modais_element[chave].classList.remove("disappear")
                modais_element[chave].classList.remove("opened")
                modais_element[chave].classList.add("closed")
            }
        }, 200);
    } else if (UIelement == "pop_up"){
        for (const chave in pop_pups_element){
            pop_pups_element[chave].classList.add("disappear")
        }
        setTimeout(() => {
            for (const chave in modais_element){
                pop_pups_element[chave].classList.remove("disappear")
                pop_pups_element[chave].classList.remove("opened")
                pop_pups_element[chave].classList.add("closed")
            }
        }, 200);
    }
}
// itens functions ///////////////////////////////////////////
// itens storage  /////////////////////////////
export function makeItemStorage(city){
    const container = document.querySelector(".container-itens-response")

    // criação dos elementos //
    const item_container = document.createElement("div")
    //////////////
    const span1 = document.createElement("span")
    const iconLocation = document.createElement("i")
    const cityName = document.createElement("p")
    const iconTemperature = document.createElement("i")
    const cityTemperature = document.createElement("p")
    //////////////
    const span2 = document.createElement("span")
    const button_fixed = document.createElement("button")
    const button_doc = document.createElement("button")
    const icon_fixed = document.createElement("i")
    const icon_doc = document.createElement("i")

    // HTML //
    cityName.innerHTML = `${city.name}, ${city.country}`
    cityTemperature.innerHTML = `${(city.temp - 273.15).toFixed(1)} °C`

    // classes //
    item_container.classList.add("item-response","shadow","closed")
    //////////////
    iconLocation.classList.add("fa-solid","fa-location-dot")
    cityName.classList.add("item-city")
    iconTemperature.classList.add("fa-solid","fa-temperature-quarter")
    cityTemperature.classList.add("item-temperature")
    //////////////
    button_fixed.classList.add("button-item-fixed")
    icon_fixed.classList.add("fa-solid","fa-thumbtack")
    button_doc.classList.add("button-item-view")
    icon_doc.classList.add("fa-solid","fa-clipboard")

    // id ///
    icon_fixed.id = "button-fixed-i"
    icon_doc.id = "button-view-i"

    // implementação //
    span1.append(iconLocation, cityName, iconTemperature, cityTemperature)

    button_fixed.append(icon_fixed)
    button_doc.append(icon_doc)
    span2.append(button_fixed, button_doc)
    
    item_container.append(span1, span2)
    container.append(item_container)

    open(item_container)
}
// itens fixed  ///////////////////////////////

// itens fixed_modal  ///////////////////////

// document_modal functions ///////////////////////////////////////////
export function documentPosition(referenceBlock){
    const item = referenceBlock
    const itemPosition = item.getBoundingClientRect()
   
    modais_element["document"].style.position = "absolute";
    modais_element["document"].style.transform = "none";

    modais_element["document"].style.top = `${itemPosition.top + window.scrollY - modais_element["document"].offsetHeight - 10}px`;

    modais_element["document"].style.left = `${
        itemPosition.left +
        window.scrollX +
        (item.offsetWidth / 2) -
        (modais_element["document"].offsetWidth / 2)
    }px`;
}

//animation functions ///////////////////////////////////////////
export function clickAnimation(targetId){
    const button = document.getElementById(targetId)
    button.classList.add("click")
    setTimeout(() => {
        button.classList.remove("click")
    }, 1000);
}
export function loadAnimation(){
    const loading = document.querySelector(".loading")
    const loadingWallpaper = document.querySelector(".loading-wallpaper")
    loading.classList.add("loading-animation")
    setTimeout(() => {
        close(loading)
        close(loadingWallpaper)
        setTimeout(() => {
            loading.remove()
            loadingWallpaper.remove()
        }, 2000);
    }, 500);
}