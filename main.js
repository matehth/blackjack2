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

function isGameOver(playerCards, dealerCards, stand) {
    const playerValue = getValue(playerCards);
    const dealerValue = getValue(dealerCards);

    if (stand) {
        if (dealerValue < 17 && dealerValue < playerValue) return false;
        else if (dealerValue == 21) return "dealerBlackjack";
        else if (dealerValue > playerValue) return "dealerWin";
        else if (playerValue > dealerValue) return "playerWin";
    }
    else {
        if (playerValue < 21 && dealerValue < 21) return false;
        else {
            if (playerValue == 21 && dealerValue == 21) return "push";
            else if (playerValue == 21) return "playerBlackjack";
            else if (dealerValue == 21) return "dealerBlackjack";
            else if (playerValue > 21) return "dealerWin";
        }
    }
}

function renderCards(playerCards, dealerCards, hideFirstDealerCard) {
    const startGameElement = document.querySelector(".startGame")
    const playerCardsElement = document.querySelector(".playerCards");
    const dealerCardsElement = document.querySelector(".dealerCards");

    startGameElement.innerHTML = "";

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
    const gameButtonsElement = document.querySelector(".gameButtons");

    gameButtonsElement.innerHTML += "<button class='hitButton'>Hit</button><button class='standButton'>Stand</button><button class='doubleDownButton'>Double Down</button>";

    if (splitPossible) gameButtonsElement.innerHTML += "<button class='splitButton'>Split</button>";
}

function renderWinner(result) {
    const resultElement = document.querySelector(".result");

    gameButtonsElement.innerHTML = ""
    resultElement.innerHTML = `${result}`;
}

function playGame(deckSize) {
    const deck = createDeck(deckSize);
    const playerCards = [];
    const dealerCards = [];

    for (let i = 0; i < 2; i++) {
        let rndNum = pickRandomCard(deck.length);
        playerCards.push(deck[rndNum]);
        deck.splice(rndNum, 1);

        rndNum = pickRandomCard(deck.length);
        dealerCards.push(deck[rndNum]);
        deck.splice(rndNum, 1);
    }

    if (isGameOver(playerCards, dealerCards, false)) {
        renderCards(playerCards, dealerCards, false);
        renderWinner(isGameOver(playerCards, dealerCards, false));
    }
    else renderCards(playerCards, dealerCards, true);
    
    if (playerCards[0].name == playerCards[1].name) renderButtons(true);
    else renderButtons(false);

    const hitButtonElement = document.querySelector(".hitButton");
    const standButtonElement = document.querySelector(".standButton");
    const doubleDownButtonElement = document.querySelector(".doubleDownButton");
    const splitButtonElement = document.querySelector(".splitButton");

    while (!isGameOver(playerCards, dealerCards, false)) {
        hitButtonElement.addEventListener("click", hit(playerCards, dealerCards));
        standButtonElement.addEventListener("click", stand(playerCards, dealerCards));
        doubleDownButtonElement.addEventListener("click", doubleDown(playerCards, dealerCards));
        splitButtonElement.addEventListener("click", split(playerCards, dealerCards));
    }
}
