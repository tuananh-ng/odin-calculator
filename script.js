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
const inputStorage = [];
const operatorQueue = [];
updateScreenWhenClickingNumbers();

const inputs = document.querySelectorAll('.math button');
inputs.forEach((input) => {
    input.addEventListener('click', () => {
        labelInputs(input);
        classifyOperators(input);
    });
});

function labelInputs(input) {
    let inputID = input.getAttribute('id');
    if (inputID.includes('num')) inputID = 'num';
    let inputContent = input.textContent;

    inputStorage.push({
        class: inputID,
        content: inputContent,
    });
}

function classifyOperators(operator) {
    let operatorName = operator.getAttribute('id');
    if (operatorName.includes('num')) return;
    let operatorIndex = inputStorage.findIndex((input) => input.class === operatorName);

    operatorQueue.push({
        name: operatorName,
        index: operatorIndex,
    });
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

function operate(operator, args) {
    let ans = operator(args);
    return ans;
}

// Math functions
function add(args) {
    return args[0] + args[1];
}

function sub(args) {
    return args[0] - args[1];
}

function mul(args) {
    return args[0] * args[1];
}

function div(args) {
    if (args[1] == 0) return;
    return args[0] / args[1];
}

function perc(args) {
    return args[0] / 100;
} // end math functions

/* Mathematically, '=' is a comparison operator
but in a simple calculator, it will perform the given calculation
and give out the result.
for now, let keep it simple by printing out the result */
function eq() {
    printToScreen(result);
}