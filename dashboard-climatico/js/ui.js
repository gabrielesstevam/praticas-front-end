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
    const blockview = document.querySelector(".block-view")
    blockview.classList.add("enter")

    function setTime(theme,time,color1,color2) {
        setTimeout(() => {
            themeModify(theme)
        }, time)
        blockview.style.background = `linear-gradient(to right, ${color1}, ${color2})`
    }

    switch (theme){
        case("light"):{
            setTime("dark", 550, "#4D4C4D", "#FFFFFF")
            break
        }
        case("dark"):{
            setTime("light", 550, "#FFFFFF", "#4D4C4D")
            break
        }
    }

    setTimeout(() => {
        document.querySelector(".block-view").classList.remove("enter")
    }, 2000)
    
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