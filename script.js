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
    eq: {
        numArgs: 2,
        func: eq,
    },
}
const inputStorage = [];
const operatorQueue = [];
const args = [];
updateScreenWhenClickingNumbers();

const inputs = document.querySelectorAll('.math button');
inputs.forEach((input) => {
    input.addEventListener('click', () => {
        labelInputs(input);
        classifyOperators(input);
        collectArgs(input);

        if (operatorQueue.length === 1 && operatorQueue.at(0).name === 'eq') {
            operatorQueue.shift();
            args.splice(1, args.length - 1);
        }

        if (operatorQueue.length === 2) {
            let operator = operatorQueue.shift();
            let numActiveArgs = operators[operator.name].numArgs;
            let activeArgs = args.splice(0, numActiveArgs);

            result = operate(operators[operator.name].func, activeArgs);
            args.unshift(result);
            printToScreen(result);
        }
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

function collectArgs(arg) {
    let argID = arg.getAttribute('id');

    if ((argID.includes('num'))) {
        if (args.length === 0) {
            args.push(arg.textContent);
            return
        }

        if (Number.isInteger(args.at(-1))) {
            args.push(arg.textContent);
        } else {
            args[args.length - 1] += arg.textContent;
        }
        
        return;
    }

    if (args.at(-1) === '') {
        return;
    }
    (args.at(-1) !== undefined) ? args[args.length - 1] = +args.at(-1) : args.push(0);
    args.push('');
}

function printToScreen(string) {
    const screen = document.querySelector('.screen');
    screen.textContent = string;
}

function updateScreenWhenClickingNumbers() {
    const nums = document.querySelectorAll('.numbers button');
    nums.forEach((num) => {
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
    return result;
}