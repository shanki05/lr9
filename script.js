const deck = [
    { name: '6', value: 6, symbol: '6' },
    { name: '7', value: 7, symbol: '7' },
    { name: '8', value: 8, symbol: '8' },
    { name: '9', value: 9, symbol: '9' },
    { name: '10', value: 10, symbol: '10' },
    { name: 'Валет', value: 2, symbol: 'J' },
    { name: 'Дама', value: 3, symbol: 'Q' },
    { name: 'Король', value: 4, symbol: 'K' },
    { name: 'Туз', value: 11, symbol: 'A' }
];

const suits = [
    { symbol: '♠', color: 'black' },
    { symbol: '♣', color: 'black' },
    { symbol: '♥', color: 'red' },
    { symbol: '♦', color: 'red' }
];

let userName = "User";
let userTotalScore = 0;
let compTotalScore = 0;
let attempt = 0;
const maxAttempts = 3;

window.onload = function() {
    let inputName = prompt("Введіть ваше ім'я для початку гри:", "Гравець");
    if (inputName !== null && inputName.trim() !== "") {
        userName = inputName.trim();
    }
    document.getElementById("user-name").innerText = userName;
};

function getRandomCard() {
    const randomCardIndex = Math.floor(Math.random() * deck.length);
    const randomSuitIndex = Math.floor(Math.random() * suits.length);
    return {
        ...deck[randomCardIndex],
        suit: suits[randomSuitIndex]
    };
}

function renderCard(cardData) {
    return `
        <div class="card ${cardData.suit.color}">
            <div class="card-top-left">${cardData.symbol}<br>${cardData.suit.symbol}</div>
            <div class="card-center">${cardData.suit.symbol}</div>
            <div class="card-bottom-right">${cardData.symbol}<br>${cardData.suit.symbol}</div>
        </div>
    `;
}

function generateCards() {
    if (attempt >= maxAttempts) return;

    attempt++;

    const userCard = getRandomCard();
    const compCard = getRandomCard();

    userTotalScore += userCard.value;
    compTotalScore += compCard.value;

    document.getElementById("user-score").innerText = userTotalScore;
    document.getElementById("comp-score").innerText = compTotalScore;
    document.getElementById("attempt-counter").innerText = `Спроба ${attempt} з ${maxAttempts}`;

    document.getElementById("user-card-container").innerHTML = renderCard(userCard);
    document.getElementById("comp-card-container").innerHTML = renderCard(compCard);

    if (attempt === maxAttempts) {
        document.getElementById("generate-btn").disabled = true;
        
        setTimeout(() => {
            let resultMsg = "";
            if (userTotalScore > compTotalScore) {
                resultMsg = `Вітаємо, ${userName}! Ви перемогли з рахунком ${userTotalScore} проти ${compTotalScore}.`;
            } else if (compTotalScore > userTotalScore) {
                resultMsg = `Комп'ютер переміг з рахунком ${compTotalScore} проти ${userTotalScore}. Спробуйте ще раз!`;
            } else {
                resultMsg = `Нічия! Рахунок: ${userTotalScore} - ${compTotalScore}.`;
            }
            alert("Гра закінчена!\n" + resultMsg + "\nОновіть сторінку, щоб зіграти знову.");
        }, 300);
    }
}