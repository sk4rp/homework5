let minValue = parseInt(prompt('Минимальное число для игры', '0'));
let maxValue = parseInt(prompt('Максимальное число для игры', '1000'));

// Проверяем корректность введенных значений и устанавливаем границы диапазона
minValue = isNaN(minValue) ? 0 : minValue;
maxValue = isNaN(maxValue) ? 1000 : maxValue;

// Определяем переменные для хранения текущего состояния игры
let guessedNumber;
let orderNumber = 1;
let gameRun = true;

// Получаем ссылки на элементы интерфейса
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Функция для начала новой игры
function startNewGame() {
    minValue = parseInt(prompt('Минимальное число для игры', '0'));
    maxValue = parseInt(prompt('Максимальное число для игры', '1000'));
    
    // Проверяем корректность введенных значений и устанавливаем границы диапазона
    minValue = isNaN(minValue) ? 0 : minValue;
    maxValue = isNaN(maxValue) ? 1000 : maxValue;

    guessedNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    updateQuestionText(guessedNumber); // Обновляем текст вопроса с новым числом
}


// Инициализация игры при загрузке страницы
window.onload = function() {
    startNewGame();
}

// Обработчики событий для кнопок
document.getElementById('btnRetry').addEventListener('click', function() {
    startNewGame();
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
        // Добавь еще варианты здесь по вашему желанию
    ];
    const randomIndex = Math.floor(Math.random() * questionVariants.length);
    const selectedQuestion = questionVariants[randomIndex];
    answerField.textContent = selectedQuestion;
}

