function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
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
        case "x":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
    }

    valueDisplay = result;
    display.textContent = valueDisplay;
    valueLast = "";
    valueNow = "";
    operationLast = operationNext;
    operationNext = "";

}

let valueDisplay = "";
let valueLast = "";
let valueNow = "";
let operationLast = "";
let operationNext = "";

// Get digits from buttons
const display = document.querySelector(".display");
const digit = document.querySelector(".digits");
digit.addEventListener("click", (e) => {
    const element = e.target
    if (element.classList[0] === "digit") {
        // Clear display and keep last value if the last operation wasn't result
        if(valueDisplay !== "") {
            display.textContent = "";
            if(operationLast !== "=") valueLast = valueDisplay;
            valueDisplay = "";
        }

        // Prohibit more than 1 dot
        if(element.textContent === "." && display.textContent.includes(".")) { return }
        
        // Replace 0 so when typing a number 0 doesn't stay as the 1st digit
        if (display.textContent === "0") display.textContent = "";

        display.textContent += element.textContent;
    }
})

// Do operations from buttons
const operationButtons = document.querySelectorAll(".operator");
operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let operation = e.target.textContent;
        if (operationLast === "" || operationLast === "=") {
            operationLast = operation;
        } else {
            operationNext = operation;
        }

        valueDisplay = display.textContent;

        if (valueLast === "") {
            valueLast = valueDisplay;
            return
        }
        valueNow = valueDisplay;
        console.log(operationLast, operationNext)

        operate(valueLast, valueNow, operationLast);
    })
});


// Get the result with equal button
const resultButton = document.querySelector(".result");
resultButton.addEventListener("click", (e) => {
    if (valueLast === "") return;
    valueNow = display.textContent;
    operate(valueLast, valueNow, operationLast);

    // Keeps track if the input was the equal sign
    operationLast = "=";
});


// Clear with the C button
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", (e) => {
    valueLast = "";
    valueNow = "";
    valueDisplay = "";
    operationLast = "";
    operationNext = "";
    display.textContent = 0;
})