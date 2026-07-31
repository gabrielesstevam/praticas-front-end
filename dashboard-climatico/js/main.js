// imports ///////////////////////////////////////////
import * as UI from "./ui.js"
import * as WS from "./weatherService.js"
localStorage.clear()
// variables ///////////////////////////////////////////
const htmlElements = { // elementos html
    button_theme:document.getElementById("button-theme"),
    button_modal_fixed:document.getElementById("button-fixed-modal"),
    content_form:document.querySelector('form'),
}
export let systemVariables = { // variáveis de sistema
    isClick:true,
    itens_fixed_qnt: 0
}

//functions ///////////////////////////////////////////
function limitActive(f1, f2=()=>{}, f3=()=>{}, f4=()=>{}) { // limitador
    if (systemVariables.isClick) {
        systemVariables.isClick = false
        f1()
        f2()
        f3()
        f4()
        setTimeout(() => {
            systemVariables.isClick = true
        }, 500)
    }
}

// events ///////////////////////////////////////////
window.addEventListener("load", () => { // carrega página // tema - loading
    UI.loadAnimation()
    UI.themeLoad()
})
htmlElements.button_theme.addEventListener("click",() => { // trocar de tema
    limitActive(
        UI.themeSwitch)
})
htmlElements.button_modal_fixed.addEventListener("click",(event) => { // abrir/fechar modal de fixos
    if (systemVariables.itens_fixed_qnt > 0){
        limitActive(
            () => UI.modal("fixed", event.target.id))
    } else {
        limitActive(
            () => UI.warn("Error: Nenhuma cidade fixada"))
    }
})
document.addEventListener("click",(event) => { // abrir/fechar modal de documentação
    if (event.target.id == "button-view" || event.target.id == "button-view-i"){
        if (document.querySelector(".container-modal-description").classList.contains("opened")){
            limitActive(
                () => UI.clickAnimation(event.target),
                () => UI.modal("document"))
        } else {
            limitActive(
                () => UI.clickAnimation(event.target),
                () => UI.documentPosition(event.target.closest(".item-response")),
                () => UI.modal("document"),
                () => UI.updateDocument(event.target.closest(".item-response").querySelector(".item-city").innerHTML.split(",")[0]))
        }
    }
})
document.addEventListener("click",(event) => { // afixar itens
    if (event.target.id == "button-fixed" || event.target.id == "button-fixed-i"){
        if (systemVariables.itens_fixed_qnt < 3){
            WS.fixedCity(event.target.closest(".item-response").querySelector(".item-city").innerHTML.split(",")[0])
        } else {
            UI.alert("Só é possível fixar 3 cidades")
        }
    }
})
document.addEventListener("click",(event) => { // apagar itens fixados
    if (event.target.id == "button-trash" || event.target.id == "button-trash-i"){
        limitActive(
            () => UI.clickAnimation(event.target),
            () => WS.deleteFixed(event.target.closest(".item-modal-fixed").querySelector(".item-city"))
        )
    }
})
htmlElements.content_form.addEventListener('submit', (event) => { // pesquisar, salvar e criar UI
    event.preventDefault(); // bloqueia o reload da página
    
    if (/\d/.test(document.getElementById("isearch-bar").value)) { // contém números
        UI.warn("Error: Digite apenas letras")
    } else if (document.getElementById("isearch-bar").value.length <= 1){ // menor ou igual a um dígito
        UI.warn("Error: Digite mais que uma letra")
    } else {
        limitActive(() => WS.saveCityDocument(document.getElementById("isearch-bar").value.trim()))
        document.getElementById("isearch-bar").value = ""
    }

});