// imports -------------------
import * as UI from "./ui.js"

// variables -----------------
const button_theme = document.getElementById("button-theme")

// events --------------------
window.addEventListener("load", () => {
    UI.themeLoad()
})
button_theme.addEventListener("click",() => {
    UI.themeSwitch()
})