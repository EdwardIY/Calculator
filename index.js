const calculator = document.querySelector('.Calculator');
const view = document.getElementById('view');

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
    'plus': '+',
    'sub': '-',
    'div': '/',
    'multi': '*'
}

let currentNum = '';

calculator.addEventListener('click', (e) => {
    console.log(e.target.id);

    if (e.target.id in numbers)
        numberPressed(numbers[e.target.id])
    if (e.target.id in symbols)
        symbolPressed(symbols[e.target.id])
})

function numberPressed(num) {
    if (num === 0 && (+view.textContent === 0) && view.textContent.length == 1)
        return
    else if (num === 0 && (currentNum.length > 0 && (+currentNum) == 0))
        return;
    

    else {
        if ((currentNum.length > 0 && (+currentNum) == 0)) {
            view.textContent = view.textContent.slice(0, -1) + num
            currentNum = currentNum.slice(0, -1) + num;
            return;

        }

        view.textContent += num;
        currentNum += num;
    }
}

function symbolPressed(symbol) {
    if (!symbol) {
        view.textContent = '';
        return;
    }

    if (symbol === '*' || symbol === '/' || symbol === '+') {
        if (view.textContent.length == 0 || (view.textContent.length == 1 && Object.values(symbols).includes(view.textContent[0])))
            return
        
        if (Object.values(symbols).includes(view.textContent.slice(-1))) {
            if (!Object.values(symbols).includes(view.textContent[view.textContent.length - 2])) {
                view.textContent = view.textContent.slice(0, -1) + symbol
                return
            }
            else return
        }
    }

    else if (symbol === '-') {
        if (view.textContent.slice(-1) == '-')
            return;
            
    }
        
    else if (symbol === '.') {
        if (view.textContent.slice(-1) == '.')
        return
    }
        
    else if (symbol === '=') {
        if (Object.values(symbols).includes(view.textContent.slice(-1)) || view.textContent.length === 0)
            return;
        else calculate()
    }
    currentNum = '';
    view.textContent += symbol
}

function calculate() {
    let calcStr = view.textContent.split('')

    for (let [index, x] of calcStr.entries()) {
        if (x == '/' || x == '*') {
            console.log(true)
            makeOperation(index,x,calcStr)
        }
    }
}

function makeOperation(pos, symbol, calcStr) {
    let right = pos;
    let left = pos;

    let result = '';
    while (calcStr[left] !== undefined) {
        left--;
        if ((calcStr[left] == '.' || !isNaN(calcStr[left])) || (calcStr[left] == '-' && calcStr[left - 1] === undefined)) {
            result = calcStr[left] + result
        }
        else break;
    }
    console.log(result)
}
