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

function playGame() {
    const deck = createDeck(1);
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

    render(playerCards, dealerCards, true);
}

function render(playerCards, dealerCards, hideFirstDealerCard) {
    const playerCardsElement = document.querySelector(".playerCards");
    const dealerCardsElement = document.querySelector(".dealerCards");

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

playGame();
