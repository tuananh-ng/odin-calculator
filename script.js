updateScreenWhenClickNumbers();

function printToScreen(string) {
    const screen = document.querySelector('.screen');
    screen.textContent = string;
}

function updateScreenWhenClickNumbers() {
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
}

/* Mathematically, '=' is a comparison operator
but in a simple calculator, it will perform the given calculation
and give out the result */
function eq(x, y, operator) {
    let result = operator(x, y);
    return result;
} // end math functions