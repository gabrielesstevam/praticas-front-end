// variáveis globais ---------------------------
const buttons = document.querySelectorAll(".button") // list buttons
const led = document.querySelector("#led")
let listHere = []
let system = false
led.classList = "off"
// funções -------------------------------------
function writeDisplay(mensage){
    if (!isNaN(parseInt(mensage))){ // mensage is number
        if (listHere.length == 0){ // lista vazía
            listHere.push(mensage)
        } else {
            if (!isNaN(parseInt(listHere[listHere.length - 1])) || (listHere[listHere.length - 1][0] == "✓" && !isNaN(parseInt(listHere[listHere.length - 1][1]))) || (listHere[listHere.length - 1][0] == "-" && listHere[listHere.length - 1].length > 1)){ // Last Digit is number
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
            console.log(listHere[listHere.length - 1][0])
            if (!isNaN(parseInt(listHere[listHere.length - 1])) || (listHere[listHere.length - 1][0] == "✓" && !isNaN(parseInt(listHere[listHere.length - 1][1]))) || (listHere[listHere.length - 1][0] == "-" && listHere[listHere.length - 1].length > 1)){ // Last Digit is number // Last Digit have ✓ and bumber // Last Digit hava -...
                if (mensage == "✓" || mensage == "="){
                    console.log("ERROR :: writeDisplay :: Impossível usar ✓ ou = depois de um número")
                } else {
                    if (mensage == "."){
                        if (verifyPoint(listHere[listHere.length - 1])) {
                            listHere[listHere.length - 1] += "."
                        } else {
                            console.log("ERROR :: writeDisplay :: Mais de 2 pontos não podem ser digitados")
                        }
                    } else {
                        listHere.push(mensage)
                    }
                }  
            } else { // Last Digit is Operator
                if (listHere[listHere.length - 1] == "✓"){
                    if (mensage == "✓"){
                        console.log("ERROR :: writeDisplay :: Operador ja digitado")
                    }
                }  else {
                    if (mensage == "✓"){
                        listHere.push(mensage)
                    } else {
                        console.log("ERROR :: writeDisplay :: Operador ja digitado")
                    }  
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
                listHere = []
                updateDisplay()
                break
            }
            case "c":{
                console.log(listHere[listHere.length - 1][listHere[listHere.length - 1].length - 1])
                if (listHere.length > 0){
                    if (listHere[listHere.length - 1].length == 2 && listHere[listHere.length - 1][listHere[listHere.length - 1].length - 2] == "-"){
                        listHere[listHere.length - 1] = listHere[listHere.length - 1].slice(0,-2)
                    } else {
                        listHere[listHere.length - 1] = listHere[listHere.length - 1].slice(0,-1)
                    }
                    if (listHere[listHere.length - 1].length == 0){
                        listHere.pop()
                    }
                    updateDisplay()
                } else {
                    console.log("ERROR :: verifyButton :: Sem dígito para apagar")
                }
                break
            }
            case "+/-":{
                if (listHere.length > 0){
                    if (!isNaN(parseInt(listHere[listHere.length - 1]))){
                        if (parseFloat(listHere[listHere.length - 1]) < 0){
                            listHere[listHere.length - 1] = listHere[listHere.length - 1].slice(1)
                            updateDisplay()
                        } else if (parseFloat(listHere[listHere.length - 1]) > 0){
                            listHere[listHere.length - 1] = "-" + listHere[listHere.length - 1]
                            updateDisplay()
                        } else if (parseFloat(listHere[listHere.length - 1]) == 0){
                            console.log("ERROR :: verifyButton :: Impossível mudar positividade de 0")
                        }
                    } else {
                        if (listHere[listHere.length - 1][0][0] == "✓"){
                            listHere[listHere.length - 1] = "-" + listHere[listHere.length - 1]
                            updateDisplay()
                        } else if (listHere[listHere.length - 1][0][0] == "-") {
                            listHere[listHere.length - 1] = listHere[listHere.length - 1].slice(1)
                            updateDisplay()
                        } else {
                            console.log("ERROR :: verifyButton :: Impossível mudar positividade de operador")
                        }
                    }
                } else {
                    console.log("ERROR :: verifyButton :: Nenhum número digitado")
                }
                console.log(listHere)
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
                if (button.innerHTML == "+/-"){
                    break
                } else {
                    writeDisplay(button.innerHTML)
                }
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
    console.log(calList)
    while (true){
        if (calList.length == 1){
            if (calList[0].includes("✓")){
                if (calList[0][0] == "-"){
                    listHere = []
                    listHere.push(-source(parseFloat(calList[0].slice(2))))
                    updateDisplay()
                } else {
                    listHere = []
                    listHere.push(source(parseFloat(calList[0].slice(1))))
                    updateDisplay()
                } 
            } else {
                listHere = []
                listHere.push(calList[0])
                updateDisplay()
            }
            return
        } else {
            let responseFunction = operatorCalculated([calList[0],calList[1],calList[2]])
            calList.splice(0, 3)
            calList.unshift(`${responseFunction}`)
        }
    }
}
function operatorCalculated([n1f,operator,n2f]){
    let n1 = parseFloat(n1f)
    let n2 = parseFloat(n2f)
    if (n1f.includes("✓")){
        if (n1f[0] == "-"){
            n1 = parseFloat(`-${source(parseFloat(n1f.slice(2)))}`)
        } else if (n1f[2] == "-"){
            n1 = parseFloat(source(`-${parseFloat(n1f.slice(2))}`))
        } else {
            n1 = parseFloat(source(parseFloat(n1f.slice(1))))
        }    
    }
    if (n2f.includes("✓")){
        if (n2f[0] == "-"){
            n2 = parseFloat(`-${source(parseFloat(n2f.slice(2)))}`)
        } else if (n2f[2] == "-"){
            n2 = parseFloat(source(`-${parseFloat(n2f.slice(2))}`))
        } else {
            n2 = parseFloat(source(parseFloat(n2f.slice(1))))
        }  
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
    }
}
function source(number){
        return Math.sqrt(number)
}
function verifyPoint(number) {
    let cont = 0
    for (const i of number){
        if (i == "."){
            cont ++
        }
    }
    if (cont == 0){
        return true
    } else if (cont > 0) {
        return false
    }
}
// eventos -------------------------------------
for (const button of buttons){ // event click in buttons
    button.addEventListener("click", () => {
        verifyButton(event.target)
    })
}
