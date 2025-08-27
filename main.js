class Card {
    constructor (name, suit, value) {
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
}

function createDeck(amount) {
    const deck = [];

    for (let i = 0; i < amount; i++) {
        for (let i = 2; i <= 10; i++) {
            const card = new Card(`${i}`, "hearts", i);
            deck.push(card);
        }
        deck.push(new Card(`jack`, "hearts", 10));
        deck.push(new Card(`queen`, "hearts", 10));
        deck.push(new Card(`king`, "hearts", 10));
        deck.push(new Card(`ace`, "hearts", 11));

        for (let i = 2; i <= 10; i++) {
            const card = new Card(`${i}`, "diamonds", i);
            deck.push(card);
        }
        deck.push(new Card(`jack`, "diamonds", 10));
        deck.push(new Card(`queen`, "diamonds", 10));
        deck.push(new Card(`king`, "diamonds", 10));
        deck.push(new Card(`ace`, "diamonds", 11));

        for (let i = 2; i <= 10; i++) {
            const card = new Card(`${i}`, "clubs", i);
            deck.push(card);
        }
        deck.push(new Card(`jack`, "clubs", 10));
        deck.push(new Card(`queen`, "clubs", 10));
        deck.push(new Card(`king`, "clubs", 10));
        deck.push(new Card(`ace`, "clubs", 11));

        for (let i = 2; i <= 10; i++) {
            const card = new Card(`${i}`, "spades", i);
            deck.push(card);
        }
        deck.push(new Card(`jack`, "spades", 10));
        deck.push(new Card(`queen`, "spades", 10));
        deck.push(new Card(`king`, "spades", 10));
        deck.push(new Card(`ace`, "spades", 11));
    }

    return deck;
}


function pickRandomCard(deckSize) {
    return Math.floor(Math.random() * deckSize);
}

function getValue(cards) {
    let value = 0;

    for (card of cards) {
        if (value > 10 && card.value == 11) value += 1;
        else value += card.value;
    }

    return value;
}

function isGameOver(stand) {
    const playerValue = getValue(playerCards);
    const dealerValue = getValue(dealerCards);

    if (stand) return !(dealerValue < 17 && dealerValue < playerValue);
    else return !(playerValue < 21 && dealerValue < 21);
}

function checkWinner() {
    const playerValue = getValue(playerCards);
    const dealerValue = getValue(dealerCards);

    if (dealerValue == playerValue) return "Push!";
    else if (playerValue == 21) return "Blackjack!";
    else if (playerValue > 21) return "You Lose!";
    else if (dealerValue > 21) return "You Win!";
    else if (playerValue > dealerValue) return "You Win!";
    else if (dealerValue > playerValue) return "You Lose!";
}

const startGameElement = document.querySelector(".startGame")
const playerCardsElement = document.querySelector(".playerCards");
const dealerCardsElement = document.querySelector(".dealerCards");
const gameButtonsElement = document.querySelector(".gameButtons");
const playAgainElement = document.querySelector(".playAgain");

function renderCards(hideFirstDealerCard) {
    startGameElement.innerHTML = "";
    playerCardsElement.innerHTML = "";
    dealerCardsElement.innerHTML = "";

    playerCardsElement.innerHTML += `<p>Player Cards</p>`;
    for (card of playerCards) {
        playerCardsElement.innerHTML += `<p><img src="icons/${card.suit}.png"> ${card.name}</p>`;
    }

    dealerCardsElement.innerHTML += `<p>Dealer Cards</p>`;
    if (hideFirstDealerCard) {
        dealerCardsElement.innerHTML += `<p><img src="icons/cardback.png"> Hidden</p>`;
        for (let i = 1; i < dealerCards.length; i++) {
            dealerCardsElement.innerHTML += `<p><img src="icons/${dealerCards[i].suit}.png"> ${dealerCards[i].name}</p>`;
        }
    } else {
        for (let i = 0; i < dealerCards.length; i++) {
            dealerCardsElement.innerHTML += `<p><img src="icons/${dealerCards[i].suit}.png"> ${dealerCards[i].name}</p>`;
        }
    }
}

function renderButtons(splitPossible) {
    gameButtonsElement.innerHTML += "<button id='hitButton'>Hit</button><button id='standButton'>Stand</button><button id='doubleDownButton'>Double Down</button>";

    // if (splitPossible) gameButtonsElement.innerHTML += "<button id='splitButton'>Split</button>";
}

function renderWinner(result) {
    gameButtonsElement.innerHTML = "";
    gameButtonsElement.innerHTML = `${result}`;

    playAgainElement.innerHTML = "<a href='index.html'><button>Play Again</button></a>"
}

let deck = [];
const playerCards = [];
const dealerCards = [];

function playGame(deckSize) {
    deck = createDeck(deckSize);

    for (let i = 0; i < 2; i++) {
        let rndNum = pickRandomCard(deck.length);
        playerCards.push(deck[rndNum]);
        deck.splice(rndNum, 1);

        rndNum = pickRandomCard(deck.length);
        dealerCards.push(deck[rndNum]);
        deck.splice(rndNum, 1);
    }

    if (isGameOver(false)) {
        renderCards(false);
        renderWinner(checkWinner());
    }
    else renderCards(true);
    
    if (playerCards[0].name == playerCards[1].name) renderButtons(true);
    else renderButtons(false);

    document.getElementById("hitButton").addEventListener("click", hit);
    document.getElementById("standButton").addEventListener("click", stand);
    document.getElementById("doubleDownButton").addEventListener("click", doubleDown);
    // document.getElementById("splitButton").addEventListener("click", split);
}

function hit() {
    let rndNum = pickRandomCard(deck.length);
    playerCards.push(deck[rndNum]);
    deck.splice(rndNum, 1);
    renderCards(true);
    if (isGameOver(false)) renderWinner(checkWinner());
}

function stand() {
    if (isGameOver(true)) {
        renderCards(false);
        renderWinner(checkWinner())
    } else {
        while (!isGameOver(true)) {
            rndNum = pickRandomCard(deck.length);
            dealerCards.push(deck[rndNum]);
            deck.splice(rndNum, 1);
            renderCards(false)
        }
        renderWinner(checkWinner());
    }
}

function doubleDown() {
    let rndNum = pickRandomCard(deck.length);
    playerCards.push(deck[rndNum]);
    deck.splice(rndNum, 1);
    renderCards(true);
    if (isGameOver(false)) {
        renderCards(false);
        renderWinner(checkWinner());
    } else stand();
}

/*
function split() {

}
*/