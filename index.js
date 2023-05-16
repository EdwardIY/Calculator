const calculator = document.querySelector('.Calculator');
const display = document.getElementById('display');
const memory = document.getElementById('mem');

const numbers = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0,
}
const symbols = {
    'equals': '=',
    'decimal': '.',
    'clear': null,
    'add': '+',
    'subtract': '-',
    'divide': '/',
    'multiply': '*'
}

let currentNum = '';
let calculated = false

calculator.addEventListener('click', (e) => {
    console.log(e.target.id);

    if (e.target.id in numbers) {
        if (calculated) {
            mem.textContent = '';
            display.textContent = '';
            currentNum = '';
            calculated = false
        }
        numberPressed(numbers[e.target.id])
    }
    if (e.target.id in symbols) {
        if (calculated) {
            mem.textContent = '';
            calculated = false
        }
        symbolPressed(symbols[e.target.id])
    }
})

function numberPressed(num) {
    if (num === 0 && (+display.textContent === 0) && display.textContent.length == 1)
        return
    else if (num === 0 && (currentNum.length > 0 && (+currentNum) == 0))
        return;
    

    else {
        if ((currentNum.length > 0 && (+currentNum) == 0) && currentNum[1] != '.') {
            console.log( currentNum[0])
            display.textContent = display.textContent.slice(0, -1) + num
            currentNum = currentNum.slice(0, -1) + num;
            return;

        }

        display.textContent += num;
        currentNum += num;
    }
}

function symbolPressed(symbol) {

    if (!symbol) {
        display.textContent = '';
        currentNum = '';
        return;
    }

    if (symbol === '*' || symbol === '/' || symbol === '+') {
        if (display.textContent.length == 0 || (display.textContent.length == 1 && Object.values(symbols).includes(display.textContent[0])))
            return
        
        if (Object.values(symbols).includes(display.textContent.slice(-1))) {
            if (!Object.values(symbols).includes(display.textContent[display.textContent.length - 2])) {
                display.textContent = display.textContent.slice(0, -1) + symbol
            }
            return;
        }
    }

    else if (symbol === '-') {
        if (display.textContent.slice(-1) == '-')
            return;
    }
        
    else if (symbol === '.') {
        // if (display.textContent.slice(-1) == '.')
        //     return
        if (!currentNum.includes('.')) {
            display.textContent += symbol
            currentNum+= symbol
        }
        return
    }
        
    else if (symbol === '=') {
        if (Object.values(symbols).includes(display.textContent.slice(-1)) || display.textContent.length === 0)
            return;
        else {
            currentNum = '';
            display.textContent += symbol
            calculate()
        }
        return;
    }
    currentNum = '';
    display.textContent += symbol
}

function calculate() {
    let calcStr = display.textContent;
    memory.textContent = calcStr
    display.textContent = eval(calcStr.slice(0, -1));
    calculated = true
    

}



