// Инициализация переменных для хранения текущего состояния игры
let minValue;
let maxValue;
let guessedNumber;
let orderNumber = 1;
let gameRun = false;

// Получаем ссылки на элементы интерфейса
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const btnLess = document.getElementById('btnLess');
const btnOver = document.getElementById('btnOver');
const btnEqual = document.getElementById('btnEqual');
const btnRetry = document.getElementById('btnRetry');
const btnStart = document.getElementById('btnStart');
const minValueInput = document.getElementById('minValueInput');
const maxValueInput = document.getElementById('maxValueInput');

// Устанавливаем начальный текст при загрузке страницы
answerField.innerText = 'Загадайте число от 0 до 1000';

// Обработчики событий для кнопок
btnRetry.addEventListener('click', startNewGame);
btnStart.addEventListener('click', startNewGame);
btnOver.addEventListener('click', guessMore);
btnLess.addEventListener('click', guessLess);
btnEqual.addEventListener('click', guessEqual);

// Устанавливаем начальное состояние кнопок при загрузке страницы
btnLess.disabled = true;
btnOver.disabled = true;
btnRetry.disabled = true;
btnEqual.disabled = true;

// Функция для начала новой игры
function startNewGame() {
    minValue = parseInt(minValueInput.value) || 0;
    maxValue = parseInt(maxValueInput.value) || 1000;

    // Проверка на отрицательные значения
    if (minValue < 0 || maxValue < 0) {
        answerField.innerText = "Минимальный и максимальный диапазон должны быть от 0 до 1000";
        return;
    }

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue];
    }

    minValue = Math.max(minValue, -999);
    maxValue = Math.min(maxValue, 999);

    // Проверяем, что пользователь ввел значения
    if (minValueInput.value === '' || maxValueInput.value === '') {
        answerField.innerText = "Введите значения для начала игры";
        return;
    }

    // Используем бинарный поиск для угадывания числа
    guessedNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    // Разблокировать кнопки только если игра начата и значения введены
    btnLess.disabled = false;
    btnOver.disabled = false;
    btnRetry.disabled = false;
    btnEqual.disabled = false;

    orderNumberField.innerText = orderNumber;
    // Обновляем текст вопроса только если игра начата не впервые (когда поля ввода не пустые)
    if (minValueInput.value !== '' || maxValueInput.value !== '') {
        updateQuestionText(guessedNumber);
    } else {
        answerField.innerText = "Загадайте число от 0 до 1000";
    }
}


// Функции для обработки событий кнопок
function guessMore() {
    if (gameRun) {
        if (minValue === maxValue) {
            showGiveUpMessage();
        } else {
            minValue = guessedNumber + 1;
            guessedNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            updateQuestionText(guessedNumber);
        }
    }
}

function guessLess() {
    if (gameRun) {
        if (minValue === maxValue) {
            showGiveUpMessage();
        } else {
            // Изменяем логику уменьшения числа
            maxValue = guessedNumber - 1;
            if (maxValue < minValue) {
                showGiveUpMessage();
            } else {
                guessedNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                updateQuestionText(guessedNumber);
            }
        }
    }
}

function guessEqual() {
    if (gameRun) {
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        gameRun = false;
    }
}

function retryGame() {
    // Очищаем текстовые поля
    minValueInput.value = '';
    maxValueInput.value = '';

    // Устанавливаем начальное сообщение
    answerField.innerText = "Загадайте число от 0 до 1000";

    // Устанавливаем исходный текст для кнопки "Заново"
    btnRetry.innerText = "Заново";

    // Блокируем кнопки "больше", "меньше", "заново" после нажатия "Заново"
    btnLess.disabled = true;
    btnOver.disabled = true;
    btnRetry.disabled = true;
    btnEqual.disabled = true;
}

btnRetry.addEventListener('click', retryGame);

btnStart.addEventListener('click', function() {
    // Вызываем функцию начала новой игры
    startNewGame();
});



// Функция для обновления текста вопроса с несколькими вариантами
function updateQuestionText(number) {
    const questionVariants = [
        `Да это легко! Ты загадал ${numberToText(number)}?`,
        `Наверное, это число ${numberToText(number)}?`,
        `Может быть, это ${numberToText(number)}?`
    ];
    const randomIndex = Math.floor(Math.random() * questionVariants.length);
    answerField.textContent = questionVariants[randomIndex];
}

// Функция для отображения сообщения о сдаче
function showGiveUpMessage() {
    const phraseRandom = Math.round(Math.random());
    const answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;
    answerField.innerText = answerPhrase;
    gameRun = false;
}

// Функция для приведения числа к текстовой форме
function numberToText(number) {
    const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

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

// Инициализация игры при загрузке страницы
window.onload = function() {
    startNewGame();
};