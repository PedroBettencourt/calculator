function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function multiply(a, b) {
    return a / b;
}


function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;

    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    }
    return result;
}

let valueDisplay = "";
let valueLast = "";
let valueNow = "";

const display = document.querySelector(".display");
const digit = document.querySelector(".digits");
digit.addEventListener("click", (e) => {
    const element = e.target
    if (element.classList[0] === "digit") {
        if(valueDisplay !== "") {
            display.textContent = "";
            valueLast = valueDisplay;
            valueDisplay = "";
        }

        if(element.textContent === "." && display.textContent.includes(".")) { return }
        display.textContent += element.textContent;
    }
})

const plus = document.querySelector("#plus");
plus.addEventListener("click", () => {
    if (valueLast === "") {
        valueLast = display.textContent;
        display.textContent = "";
        return
    }
    valueNow = display.textContent;

    valueDisplay = operate(valueLast, valueNow, "+");
    display.textContent = valueDisplay;
    valueLast = "";
    valueNow = "";
    
});
