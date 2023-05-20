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
    'clear': 'clear',
    'delete': 'delete',
    'add': '+',
    'subtract': '-',
    'divide': '/',
    'multiply': 'x'
}

let currentNum = '';
let calculated = false

calculator.addEventListener('click', (e) => {
    console.log(e.target.id);
    console.log(currentNum.textContent)

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
    if (symbol == 'delete') {
        if (display.textContent != 'NaN' && display.textContent != 'Infinity') {
            display.textContent = display.textContent.slice(0,-1);
            currentNum = currentNum.slice(0,-1); 
        }     
        return;

    }
    if (symbol == 'clear') {
        display.textContent = '';
        currentNum = '';
        return;
    }
    if (display.textContent[display.textContent.length - 1] == '.')
        return display.textContent = display.textContent.slice(0, -1) + symbol
    if (symbol === 'x' || symbol === '/' || symbol === '+') {
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
            display.textContent += symbol
            currentNum = calculate()
        }
        return;
    }
    currentNum = '';
    display.textContent += symbol
}

function calculate() {
    let calcStr = display.textContent;
    let answer = eval(calcStr.split('x').join('*').slice(0, -1))
    memory.textContent = calcStr
    display.textContent = answer;
    calculated = true
    
    return answer.toString()
}



