import * as UI from "./ui.js"
// variables -----------------
const button_theme = document.getElementById("button-theme")
// events --------------------
button_theme.addEventListener("click",() => {
    UI.themeSwitch()
})