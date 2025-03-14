function operate() {
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
    valueDisplay = currValue;
    display.textContent = valueDisplay;
    valueLast = "";
    valueNow = "";
    currOperation = "";
}

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
        if(displayValue) {
            display.textContent = 0;
            displayValue = "";
        }

        // Prohibit more than 1 dot
        if (element.textContent === "." && display.textContent.includes(".")) { return }
        
        // Replace 0 so when typing a number 0 doesn't stay as the 1st digit
        if (display.textContent.at(0) === "0") display.textContent = display.textContent.slice(1);
        
        // Store curr operation if operation has been chosen
        if (tempOperation !== "") {
            currOperation = tempOperation;
            tempOperation = "";
        }

        currValue += element.textContent;
        display.textContent += element.textContent;
    }
})

// Do operations from buttons
const operationButtons = document.querySelectorAll(".operator");
operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const operation = e.target.textContent;
        tempOperation = operation;

        if (currValue === "") return
        if (lastValue !== "" && currOperation !== "") {
            operate()
        }
        displayValue = currValue;
        lastValue = currValue;
        currValue = "";
    })
});

// Get the result with equal button
const resultButton = document.querySelector(".result");
resultButton.addEventListener("click", (e) => {
    if (lastValue === "") return;

    operate();
    lastValue = currValue;
    displayValue = currValue;
    currValue = "";
});

// Clear with the C button
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", (e) => {
    currValue = "";
    lastValue = "";
    currOperation = "";
    display.textContent = 0;
});

// Delete with DEL button
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
    currValue = currValue.slice(0, -1);
    display.textContent = currValue;
});