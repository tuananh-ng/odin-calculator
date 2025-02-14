let result = 0;
const operators = {
    add: {
        numArgs: 2,
        func: add,
    },
    sub: {
        numArgs: 2,
        func: sub,
    },
    div: {
        numArgs: 2,
        func: div,
    },
    mul: {
        numArgs: 2,
        func: mul,
    },
    perc: {
        numArgs: 1,
        func: perc,
    },
}
const inputQueue = [];
const operatorQueue = [];

updateScreenWhenClickingNumbers();
operate();

function operate() {
    const inputs = document.querySelectorAll('.math button');
    inputs.forEach((input) => {
        input.addEventListener('click', () => {
            classifyInputs(input);
        });
    });
    
    const mathOperators = document.querySelectorAll('.math .operators button');
    mathOperators.forEach((mathOperator) => {
        mathOperator.addEventListener('click', () => {
            classifyOperators(mathOperator);
        });
    });

    function classifyInputs(input) {
        let inputID = input.getAttribute('id');
        if (inputID.includes('num')) inputID = 'num';
        let inputContent = input.textContent;
    
        inputQueue.push({
            class: inputID,
            content: inputContent,
        });
    }

    function classifyOperators(operator) {
        let operatorName = operator.getAttribute('id');
        let operatorIndex = inputQueue.findIndex((input) => input.class === operatorName);

        operatorQueue.push({
            name: operatorName,
            index: operatorIndex,
        });
    }
}

function printToScreen(string) {
    const screen = document.querySelector('.screen');
    screen.textContent = string;
}

function updateScreenWhenClickingNumbers() {
    const nums = document.querySelectorAll('.numbers button');
    nums.forEach((num) => {
        if (num.textContent === '.') return;
        num.addEventListener('click', () => {
            printToScreen(num.textContent);
        });
    });
}

// Math functions
function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mul(x, y) {
    return x * y;
}

function div(x, y) {
    if (y == 0) return;
    return x / y;
}

function perc(x) {
    return x / 100;
} // end math functions

/* Mathematically, '=' is a comparison operator
but in a simple calculator, it will perform the given calculation
and give out the result.
for now, let keep it simple by printing out the result */
function eq() {
    printToScreen(result);
}