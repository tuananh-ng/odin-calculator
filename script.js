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

const allClearBtn = document.querySelector('.functions button#ac');
allClearBtn.addEventListener('click', ac);
const delBtn = document.querySelector('.functions button#del');
delBtn.addEventListener('click', del);

const inputs = document.querySelectorAll('.math button');
inputs.forEach((input) => {
    input.addEventListener('click', () => {
        labelInputs(input);
        collectOperators(input);
        collectArgs(input);

        if (operatorQueue.length >= 1 && operatorQueue.at(0) === 'eq') {
            operatorQueue.shift();
            if (args.at(0) === 0) args.shift();
        }

        if (operatorQueue.length === 2) {
            let operator = operatorQueue.shift();
            let numActiveArgs = operators[operator].numArgs;
            let activeArgs = args.splice(0, numActiveArgs);
            console.log(`${operator} with ${activeArgs}`);

            result = operate(operators[operator].func, activeArgs);
            result = roundTo2DecimalPlaces(result);
            console.log(`result: ${result}`);

            inputStorage.splice(0, numActiveArgs + 1);
            if (result === undefined) {
                alert('Did you just divide by 0? The result is undefined but got put back to 0 for the next calculation.');
                result = 0;
            }
            args.unshift(result); // feed the current result to the next calculation
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

function collectOperators(operator) {
    let operatorName = operator.getAttribute('id');
    if (operatorName.includes('num')) return;

    if (operatorName === operatorQueue.at(-1)) return;
    operatorQueue.push(operatorName);
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

    /* Whenever an operator is pressed, it is supposed to make a new slot
    for a new argument. This prevents the function from adding a new slot
    and converting the previous slot into 0 when two continuous operators
    are pressed */
    if (args.at(-1) === '') {
        return;
    }

    (args.at(-1) !== undefined) ? args[args.length - 1] = +args.at(-1) : args.push(0);
    args.push(''); // make a new slot for the next argument
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

// back to the starting line
function ac() {
    result = 0;
    inputStorage.splice(0, inputStorage.length);
    operatorQueue.splice(0, operatorQueue.length);
    args.splice(0, args.length);
    console.log(`all clear`);
    printToScreen(result);
}

// remove the last input and print the input before
function del() {
    let lastInput = inputStorage.pop();
    if (!lastInput) {
        console.log('No input found');
        return;
    }

    let kind = lastInput.class;
    let removed;
    if (operatorQueue.at(-1) && kind !== 'num') {
        if (lastInput.class === operatorQueue.at(-1)) {
            removed = operatorQueue.pop();
            console.log(`deleted input named ${removed}`);
        }
    }

    if (args.at(-1) && kind === 'num') {
        let inputString = args.at(-1);
        let lastChar = inputString.at(-1);
        removed = lastChar;
        console.log(`deleted input named ${removed}`);
        if (lastInput.content === lastChar) {
            if (inputString.length === 1) {
                args[args.length - 1] = '';
            } else {
                args[args.length - 1] = inputString.substring(0, inputString.length - 1);
            }
        }
    }

    if (inputStorage.at(-1)) printToScreen(inputStorage.at(-1).content);
}

function roundTo2DecimalPlaces(num) {
    if (typeof(num) !== 'number') return;
    
    return Math.round(num * 100) / 100;
}