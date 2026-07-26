// imports -------------------
import * as UI from "./ui.js"

// variables -----------------
const button_theme = document.getElementById("button-theme")

// events --------------------
window.addEventListener("load", () => { // carregar tema
    UI.themeLoad()
})
button_theme.addEventListener("click",() => { // trocar de tema
    UI.themeSwitch()
})