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
let total = 0;

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
        currentNum = '';
        return;
    }

    if (symbol === '*' || symbol === '/' || symbol === '+') {
        if (view.textContent.length == 0 || (view.textContent.length == 1 && Object.values(symbols).includes(view.textContent[0])))
            return
        
        if (Object.values(symbols).includes(view.textContent.slice(-1))) {
            if (!Object.values(symbols).includes(view.textContent[view.textContent.length - 2])) {
                view.textContent = view.textContent.slice(0, -1) + symbol
            }
            return;
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
        else {
            currentNum = '';
            view.textContent += symbol
            calculate()
        }
        return;
    }
    currentNum = '';
    view.textContent += symbol
}

function calculate() {
    let calcStr = view.textContent;
    view.textContent += eval(calcStr.slice(0, -1));
    

}



