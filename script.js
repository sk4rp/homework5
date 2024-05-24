// Инициализация переменных для хранения текущего состояния игры
let minValue;
let maxValue;
let guessedNumber;
let orderNumber = 1;
let gameRun = true;

// Получаем ссылки на элементы интерфейса
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Функция для начала новой игры с использованием prompt и alert
function startNewGamePrompt() {
    let inputMinValue = prompt('Введите минимальное число для игры', '0');
    let inputMaxValue = prompt('Введите максимальное число для игры', '1000');

    minValue = parseInt(inputMinValue) || 0;
    maxValue = parseInt(inputMaxValue) || 1000;

    if (minValue > maxValue) {
        const temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    }

    minValue = minValue < -999 ? -999 : minValue;
    maxValue = maxValue > 999 ? 999 : maxValue;

    guessedNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    updateQuestionText(guessedNumber); // Обновляем текст вопроса с новым числом
}

// Инициализация игры при загрузке страницы с использованием prompt и alert
window.onload = function() {
    startNewGamePrompt();
};

// Обработчики событий для кнопок
document.getElementById('btnRetry').addEventListener('click', function() {
    startNewGamePrompt();
});

document.getElementById('btnOver').addEventListener('click', function() {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = guessedNumber + 1;
            guessedNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${guessedNumber}?`;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function() {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = guessedNumber - 1;
            guessedNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${guessedNumber}?`;
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function() {
    if (gameRun) {
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false;
    }
});

// Функция для обновления текста вопроса с несколькими вариантами
function updateQuestionText(number) {
    const questionVariants = [
        `Да это легко! Ты загадал ${number}?`,
        `Наверное, это число ${number}?`,
        `Может быть, это ${number}?`
    ];
    const randomIndex = Math.floor(Math.random() * questionVariants.length);
    const selectedQuestion = questionVariants[randomIndex];
    answerField.textContent = selectedQuestion;
}

// Функция для приведения числа к текстовой форме
function numberToText(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['','сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    if (number === 0) return 'ноль';
    
    let text = '';
    
    if (number < 0) {
        text += 'минус ';
        number = Math.abs(number);
    }
    
    if (number >= 100) {
        text += hundreds[Math.floor(number / 100)] + ' ';
        number %= 100;
    }
    
    if (number >= 20) {
        text += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
    }
    
    if (number >= 10) {
        text += teens[number - 10] + ' ';
        number = 0;
    }
    
    if (number > 0) {
        text += units[number];
    }
    
    return text.trim();
}

