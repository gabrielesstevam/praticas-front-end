// imports -------------------
import * as UI from "./ui.js"

// variables -----------------
const htmlElements = { // elementos html
    button_theme:document.getElementById("button-theme"),
    button_modal_fixed:document.getElementById("button-fixed-modal")
}
let systemVariables = { // variáveis de sistema
    isClick:true,
    itens_fixed_qnt:0
}
//functions --------------------
function limitActive(def) {
    if (systemVariables.isClick) {
        systemVariables.isClick = false
        def()
        setTimeout(() => {
            systemVariables.isClick = true
        }, 500)
    }
}
// events ----------------------
window.addEventListener("load", () => { // carregar tema
    UI.themeLoad()
})
htmlElements.button_theme.addEventListener("click",() => { // trocar de tema
    limitActive(UI.themeSwitch)
})
htmlElements.button_modal_fixed.addEventListener("click",() => { // abrir/fechar modal de fixos
    if (systemVariables.itens_fixed_qnt > 0){
        limitActive(() => UI.modal("fixed"))
    } else {
        limitActive(() => UI.warn("Nenhuma cidade foi fixada ainda"))
        console.log("Nenhuma cidade encontrada :: fixedbutton")
    }
})
document.addEventListener("click",(event) => {
    if (event.target.id == "button_item_view"){
        limitActive(() => UI.modal("document"))
    }
})
