// imports -------------------
import * as UI from "./ui.js"
import * as WS from "./weatherService.js"

// variables -----------------
const htmlElements = { // elementos html
    button_theme:document.getElementById("button-theme"),
    button_modal_fixed:document.getElementById("button-fixed-modal"),
}
let systemVariables = { // variáveis de sistema
    isClick:true,
    itens_fixed_qnt:0
}
//functions --------------------
function limitActive(def1, def2=()=>{}, def3=()=>{}) {
    if (systemVariables.isClick) {
        systemVariables.isClick = false
        def3()
        def1()
        def2()
        setTimeout(() => {
            systemVariables.isClick = true
        }, 500)
    }
}
// events ----------------------
window.addEventListener("load", () => { // carregar tema
    UI.loadAnimation()
    UI.themeLoad()
})
htmlElements.button_theme.addEventListener("click",() => { // trocar de tema
    limitActive(UI.themeSwitch)
})
htmlElements.button_modal_fixed.addEventListener("click",(event) => { // abrir/fechar modal de fixos
    if (systemVariables.itens_fixed_qnt > 0){
        limitActive(() => UI.modal("fixed", event.target.id))
    } else {
        limitActive(() => UI.warn("Nenhuma cidade foi fixada ainda"))
    }
})
document.addEventListener("click",(event) => {
    if (event.target.id == "button-view" || event.target.id == "button-view-i"){
        if (document.querySelector(".container-modal-description").classList.contains("opened")){
            limitActive(() => UI.modal("document"), () => UI.clickAnimation(event.target.id))
        } else {
            limitActive(() => UI.modal("document"),() => UI.clickAnimation(event.target.id),() => UI.documentPosition(event.target.closest(".item-response")))
        }
    }
})
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // bloqueia o reload da página

    if (/\d/.test(document.getElementById("isearch-bar").value)) {
        UI.warn("Digite apenas letras")
    } else if (document.getElementById("isearch-bar").value.length < 1){
        UI.warn("Digite mais que uma letra")
    } else {
        
    }

});