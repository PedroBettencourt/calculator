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

let numA;
let numB;

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break;
    }
}

const display = document.querySelector(".display");
const digit = document.querySelector(".digits");
digit.addEventListener("click", (e) => {
    const element = e.target
    if (element.classList[0] === "digit") {
        if(element.textContent === "." && display.textContent.includes(".")) { return }
        display.textContent += element.textContent;
    }
})

const plus = document.querySelector("#plus");
plus.addEventListener("click", () => {
    const valueFirst = display.textContent;
    display.textContent = "";
    console.log(valueFirst);
    //add()
});
