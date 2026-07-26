// imports -------------------
import * as UI from "./ui.js"

// variables -----------------
const htmlElements = {
    button_theme:document.getElementById("button-theme"),
}
let systemVariables = {
    isSwitchingTheme:true,
}
// events --------------------
window.addEventListener("load", () => { // carregar tema
    UI.themeLoad()
})
htmlElements.button_theme.addEventListener("click",() => { // trocar de tema
    if (systemVariables.isSwitchingTheme) {
        systemVariables.isSwitchingTheme = false
        UI.themeSwitch()
        setTimeout(() => {
            systemVariables.isSwitchingTheme = true
        }, 1000)
    }
})