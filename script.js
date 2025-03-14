function getOperation() {
    a = parseFloat(lastValue);
    b = parseFloat(currValue);
    let result;

    switch (currOperation) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "x":
            result = a * b;
            break;
        case "/":
            if(b == 0) {
                alert("Cannot divide by zero!"); 
                return;
            }
            result = a / b;
            break;
    }
    currValue = +result.toFixed(8);  
    currOperation = "";
    display.textContent = currValue;
}

function getOperationBefore(operation) {
    tempOperation = operation;

    if (currValue === "") return
    if (lastValue !== "" && currOperation !== "") {
        getOperation()
    }
    displayValue = currValue;
    lastValue = currValue;
    currValue = "";
}

function getDisplay(digit) {
    if(displayValue) {
        display.textContent = "0";
        displayValue = "";
    }

    // Prohibit more than 1 dot
    if (digit === "." && display.textContent.includes(".")) { return }
    
    // Replace 0 so when typing a number 0 doesn't stay as the 1st digit
    if (display.textContent.at(0) === "0") display.textContent = display.textContent.slice(1);
    
    // Store curr operation if operation has been chosen
    if (tempOperation !== "") {
        currOperation = tempOperation;
        tempOperation = "";
    }
    currValue += digit;
    display.textContent += digit;
}

function getResult() {
    if (lastValue === "") return;

    getOperation();
    lastValue = currValue;
    displayValue = currValue;
    currValue = "";
}

function clear() {
    currValue = "";
    lastValue = "";
    currOperation = "";
    display.textContent = "0";
}

function deleteValue() {
    currValue = currValue.slice(0, -1);
    display.textContent = currValue;
    if (currValue === "") display.textContent = "0";
}

// Global variables
let currValue = "";
let lastValue = "";
let currOperation = "";
let tempOperation = "";
let displayValue = "";

// Get digits from buttons
const display = document.querySelector(".display");

const digit = document.querySelector(".digits");
digit.addEventListener("click", (e) => {
    const element = e.target
    if (element.classList[0] === "digit") {
        getDisplay(element.textContent);
    }
})

// Do operations from buttons
const operationButtons = document.querySelectorAll(".operator");
operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const operation = e.target.textContent;
        getOperationBefore(operation);        
    })
});

// Get the result with equal button
const resultButton = document.querySelector(".result");
resultButton.addEventListener("click", () => {
    getResult()
});

// Clear with the C button
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    clear();
});

// Delete with DEL button
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
    deleteValue();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "/") e.preventDefault();
    if (key === "*") key = "x";
    if ("0123456789.".includes(key)) getDisplay(key);
    if ("+-x/".includes(key)) getOperationBefore(key);
    if (key === "=" || key === "Enter") getResult();
    if (key === "Backspace" || key === "Delete") deleteValue();
    if (key === "Escape") clear()
});