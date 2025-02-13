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