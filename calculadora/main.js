// variáveis globais ---------------------------
const buttons = document.querySelectorAll(".button") // list buttons
const led = document.querySelector("#led")
let listHere = []
let system = false
led.classList = "off"
let memory = localStorage.getItem("memory") || ""
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
                
            return
            }
        } else {
            
            if (!isNaN(parseInt(listHere[listHere.length - 1])) || (listHere[listHere.length - 1][0] == "✓" && !isNaN(parseInt(listHere[listHere.length - 1][1]))) || (listHere[listHere.length - 1][0] == "-" && listHere[listHere.length - 1].length > 1)){ // Last Digit is number // Last Digit have ✓ and bumber // Last Digit hava -...
                if (mensage == "✓" || mensage == "="){
                    
                } else {
                    if (mensage == "."){
                        if (verifyPoint(listHere[listHere.length - 1])) {
                            listHere[listHere.length - 1] += "."
                        } else {
                            
                        }
                    } else {
                        listHere.push(mensage)
                    }
                }  
            } else { // Last Digit is Operator
                if (listHere[listHere.length - 1] == "✓"){
                    if (mensage == "✓"){
                        
                    }
                }  else {
                    if (mensage == "✓"){
                        listHere.push(mensage)
                    } else {
                        
                    }  
                }
            }
        }
    }
    updateDisplay()
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
                memory = calculatedMemory()
                localStorageMem()
                break            
            }
            case "m-":{
                calculated()
                let currentValue = parseFloat(listHere[0])       // guarda o valor calculado
                listHere = []
                listHere.push(`${parseFloat(memory) - currentValue}`) // agora usa o valor guardado
                updateDisplay()
                break                                             // evita fall-through pro m+
            }
            case "m+":{
                calculated()
                let currentValue = parseFloat(listHere[0])       // guarda o valor calculado
                listHere = []
                listHere.push(`${parseFloat(memory) + currentValue}`) // agora usa o valor guardado
                updateDisplay()
                break
            }
            case "ac":{
                listHere = []
                updateDisplay()
                break
            }
            case "c":{
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
                        }
                    } else {
                        if (listHere[listHere.length - 1][0] == "✓"){
                            listHere[listHere.length - 1] = "-" + listHere[listHere.length - 1]
                            updateDisplay()
                        } else if (listHere[listHere.length - 1][0] == "-") {
                            listHere[listHere.length - 1] = listHere[listHere.length - 1].slice(1)
                            updateDisplay()
                        } else {
                        }
                    }
                }
                break
            }
            case "=":{
                if (listHere.length < 3 && listHere.length > 1 && listHere.length < 1){

                }else {
                    calculated()
                }
                break
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
        return
    }
}
function updateDisplay(error = true) {
    if (error) {
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
    } else {
        document.querySelector(".display .calc").innerHTML = "ERROR"
    }

    
}
function calculated() {
    let response = []
    let calList = [...listHere]
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
function calculatedMemory() {
    let response = []
    let calList = [...listHere]
    while (true){
        if (calList.length == 1){
            if (calList[0].includes("✓")){
                if (calList[0][0] == "-"){
                    listHere = []
                    listHere.push(-source(parseFloat(calList[0].slice(2))))
                } else {
                    listHere = []
                    listHere.push(source(parseFloat(calList[0].slice(1))))
                } 
            } else {
                listHere = []
                listHere.push(calList[0])
            }
            return calList[0]
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
function localStorageMem(){
    localStorage.setItem("memory", memory)
}
function resetMemory(){
    memory = ""
    localStorage.removeItem("memory")
}
// eventos -------------------------------------
for (const button of buttons){ // event click in buttons
    if (button.id == "mrc"){
        button.addEventListener("dblclick", () => {
            resetMemory()
        })
    }

    button.addEventListener("click", (event) => {
        verifyButton(event.target)
    })
}

