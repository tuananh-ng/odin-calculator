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

updateScreenWhenClickingNumbers();

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
and give out the result */
function eq(operator, ...args) {
    let numArgs = operators[operator].numArgs;
    if (numArgs === 1) return operators[operator].func(args[0]);

    return operators[operator].func(args[0], args[1]);
}