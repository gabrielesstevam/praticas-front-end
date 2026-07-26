// theme -----------------------------------
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
    let bodyClass = document.body.classList
    if (theme == "light"){
        bodyClass.remove("darkMode")
    } else {
        bodyClass.add("darkMode")
    }
    document.querySelector(".wallpaper-video").src = `assets/videos/${theme}-mode.webm`
    localStorage.setItem("themeStorage", theme)
}
// -----------------------------------