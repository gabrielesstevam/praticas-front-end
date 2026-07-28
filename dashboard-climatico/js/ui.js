// variables -------------------------------------
const modais = {
    fixed:document.querySelector(".container-modal-fix"),
    document:document.querySelector(".container-modal-description")
}
const pop_pups = {
    alertInterface:document.querySelector(".alert"),
    warnInterface:document.querySelector(".warn")
}
// alert ----------------------------------------
export function alert(mensage){
    pop_pups.alertInterface.innerHTML = mensage
    open(pop_pups.alertInterface)
    setTimeout(() => {
        close(pop_pups.alertInterface)
    }, 2000);
}
export function warn(mensage){
    pop_pups.warnInterface.innerHTML = mensage
    open(pop_pups.warnInterface)
    setTimeout(() => {
        close(pop_pups.warnInterface)
    }, 2000);
}
// theme ----------------------------------------
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
// fixed_modal -----------------------------------
export function modal(modal) {
    if (modais[modal].classList.contains("closed")){
        open(modais[modal])
    } else if (modais[modal].classList.contains("opened")){
        close(modais[modal])
    }
}
function open(UIelement){
    setTimeout(() => {
        UIelement.classList.add("emerge")
        setTimeout(() => {
            UIelement.classList.remove("closed")
            UIelement.classList.add("opened")
            UIelement.classList.remove("emerge")
        }, 200);
    }, 200);
}
function close(UIelement){
    setTimeout(() => {
        UIelement.classList.add("disappear")
        setTimeout(() => {
            UIelement.classList.remove("opened")
            UIelement.classList.add("closed")
            UIelement.classList.remove("disappear")
        }, 200);
    }, 200);
}
function closeAll(UIelement){
    if (UIelement == "modal"){
        for (const chave in modais){
            modais[chave].classList.add("disappear")
        }
        setTimeout(() => {
            for (const chave in modais){
                modais[chave].classList.remove("disappear")
                modais[chave].classList.remove("opened")
                modais[chave].classList.add("closed")
            }
        }, 200);
    } else if (UIelement == "pop_up"){
        for (const chave in pop_pups){
            pop_pups[chave].classList.add("disappear")
        }
        setTimeout(() => {
            for (const chave in modais){
                pop_pups[chave].classList.remove("disappear")
                pop_pups[chave].classList.remove("opened")
                pop_pups[chave].classList.add("closed")
            }
        }, 200);
    }
}    
