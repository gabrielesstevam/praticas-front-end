// variáveis globais ---------------------------
const buttons = document.querySelectorAll(".button") // list buttons
const led = document.querySelector("#led")
let listHere = []
let system = false
led.classList = "off"
console.log(listHere)
// funções -------------------------------------
function writeDisplay(mensage){
    if (!isNaN(parseInt(mensage))){ // mensage is number
        if (listHere.length == 0){ // lista vazía
            listHere.push(mensage)
        } else {
            if (!isNaN(parseInt(listHere[listHere.length - 1])) || (listHere[listHere.length - 1][0] == "✓" && !isNaN(parseInt(listHere[listHere.length - 1][1])))){ // Last Digit is number
                listHere[listHere.length - 1] = `${listHere[listHere.length - 1]}${mensage}`
            } else { // Last Digit is Operator
                if (listHere[listHere.length - 1] == "✓"){
                    listHere.pop()
                    listHere.push(`✓${mensage}`)
                } else {
                    listHere.push(mensage)
                } 
            }
        }
    } else { // mensage is operator
        if (listHere.length == 0){ // lista vazía
            if (mensage == "✓"){
                listHere.push(mensage)
            } else {
                console.log("ERROR :: writeDisplay :: Operador não pode ser o primeiro dígito")
            return
            }
        } else {
            if (!isNaN(parseInt(listHere[listHere.length - 1])) || (listHere[listHere.length - 1][0] == "✓" && !isNaN(parseInt(listHere[listHere.length - 1][1])))){ // Last Digit is number
                if (mensage == "✓" || mensage == "="){
                    console.log("ERROR :: writeDisplay :: Impossível usar ✓ ou = depois de um número")
                } else {
                    listHere.push(mensage)
                }  
            } else { // Last Digit is Operator
                if (mensage == "✓"){
                    listHere.push(mensage)
                } else {
                    console.log("ERROR :: writeDisplay :: Operador ja digitado")
                }   
            }
        }
    }
    updateDisplay()
    console.log(listHere)
}
function verifyButton(button){
    switch (button.id){
        case "off":{
            if (system == false){
                system = true
                led.classList = "on"
            } else {
                system = false
                led.classList = "off"
                listHere = []
                updateDisplay()
            }   
        }
    }
    if (system){
        switch (button.id){
            case "mrc":{
                break            
            }
            case "m-":{
                break
            }
            case "m+":{
                break
            }
            case "ac":{
                break
            }
            case "c":{
                break
            }
            case "=":{
                if (listHere.length < 3 && listHere.length > 1 && listHere.length < 1){
                    console.log("ERROR :: verifyButton :: Lista com menos de 3 argumentos para realizar operação")
                }else {
                    calculated()
                }
            }
            case "operator":{
                writeDisplay(button.innerHTML)
                break
            }
        }
    } else {
        console.log("ERROR :: verifyButton :: Calculadora desligada")
        return
    }
}
function updateDisplay() {
    let text = ""
    let idx = 0
    for (const i of listHere){
        text += `${i}`
        if (idx == listHere.length - 1) {
            break
        } else {
            text += ` `
        }
        idx ++
    }
    document.querySelector(".display .calc").innerHTML = text
}
function calculated() {
    let response = []
    let calList = [...listHere]
    while (true){
        if (calList.length == 1){
            if (calList[0][0] == "✓"){
                listHere.push("=")
                listHere.push(source(calList[0].slice(1)))
                updateDisplay()
            } else {
                listHere.push("=")
                listHere.push(calList)
                updateDisplay()
            }
            return
        } else {
            let responseFunction = operatorCalculated([calList[0],calList[1],calList[2]])
            calList.splice(0, 3)
            calList.unshift(responseFunction)
        }
    }
}
function operatorCalculated([n1f,operator,n2f]){
    let n1 = parseFloat(n1f)
    let n2 = parseFloat(n2f)
    if (n1f[0] == "✓"){
        n1 = source(parseFloat(n1f.slice(1)))
    }
    if (n2f[0] == "✓"){
        n2 = source(parseFloat(n2f.slice(1)))
    }
    switch (operator) {
        case "+":{
            return n1 + n2
        }
        case "-":{
            return n1 - n2
        }
        case "x":{
            return n1 * n2
        }
        case "/":{
            return n1 / n2
        }
        case "%":{
            return (n1/100) * n2
        }
        case "+/-":{
            return ` N(-): ${n1 + n2}  N(+):  ${n1 - n2}`
        }
    }
}
function source(number){
        let i = 0
        while(true){
            if (i * i == number){
                return i
            }
            i ++
        }
    }
// eventos -------------------------------------
for (const button of buttons){ // event click in buttons
    button.addEventListener("click", () => {
        verifyButton(event.target)
    })
}
