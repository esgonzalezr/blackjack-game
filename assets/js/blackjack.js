/**
 * 2C - Two of clubs 
 * 2D - Two of diamonds
 * 2H - Two of hearts
 * 2S - Two of spades
 */

let deck = [];
const cardLetters = ['C', 'D', 'H', 'S'];
const specialCards = ['A', 'J', 'Q', 'K'];
let playerPoints = 0, computerPoints = 0;

//HTML references
const btnCardRequest = document.querySelector('#btnCardRequest');
const btnStop = document.querySelector('#btnStop');
const labelPoints = document.querySelectorAll('small'); //[0] = player points [1] computer points
const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');
const btnNewGame = document.querySelector('#btnNewGame');

//Creates and returns a new randomized deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const letter of cardLetters) {
            deck.push(i + letter);
        }
    }

    for (const letter of cardLetters) {
        for (const card of specialCards) {
            deck.push(card + letter);
        }
    }

    // console.log("Deck original: " + deck);
    return deck = shuffleDeck(deck);
}

//Shuffle the deck
function shuffleDeck(deck = []) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log("Deck randomized: ", deck);
    return deck;
}

//console.log(createDeck());
createDeck();

//Request a card
const requestCard = () => {
    if (deck.length === 0) {
        setTimeout(() => {
            alert('There is no cards remaining!');
        }, 300);
        throw Error('There is no cards remaining');
    }
    const newCard = deck.pop();
    //console.log("Remaining cards: " + deck.length + ", last delivered card: " + newCard);
    return newCard;
}

//Get the value of a given card
const cardsValue = (card = '') => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? ((value === 'A') ? 11 : 10) : value * 1;
}

/**
 * EVENTS
 */
btnCardRequest.addEventListener('click', () => {
    const card = requestCard();
    playerPoints += cardsValue(card);
    labelPoints[0].innerText = 'Points: ' + playerPoints;

    //<img class="card" src="assets/cards/10C.png" alt="">
    const cardImg = document.createElement('img');
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.classList.add('card');
    divPlayerCards.append(cardImg);

    // console.log(typeof (playerPoints));
    if (playerPoints > 21) {
        btnCardRequest.disabled = true;
        computerShift(playerPoints);
    } else if (playerPoints === 21) {
        btnCardRequest.disabled = true;
        computerShift(playerPoints);
    }
});

//Stop player shift
btnStop.addEventListener('click', () => {
    btnStop.disabled = true;
    btnCardRequest.disabled = true;
    computerShift();
});

//New game
btnNewGame.addEventListener('click', () => {
    btnStop.disabled = false;
    btnCardRequest.disabled = false;

    labelPoints[0].innerText = 0;
    labelPoints[1].innerText = 0;

    playerPoints = 0;
    computerPoints = 0;

    divPlayerCards.innerHTML = '';
    divComputerCards.innerHTML = '';

    deck = [];
    createDeck();

});

//Computer shift
const computerShift = (minpoints) => {
    //deck = ['10D', '10D'];
    createDeck();

    do {
        const card = requestCard();
        computerPoints += cardsValue(card);
        labelPoints[1].innerText = 'Points: ' + computerPoints;

        const cardImg = document.createElement('img');
        cardImg.src = `assets/cards/${card}.png`;
        cardImg.classList.add('card');
        divComputerCards.append(cardImg);

        if (minpoints > 21)
            break;

    } while (computerPoints <= playerPoints);

    //Calculate results
    // playerPoints = 21;
    // computerPoints = 21;
    if (playerPoints == computerPoints) {
        setTimeout(() => {
            alert('Tie');
        }, 300);
    } else if (playerPoints <= 21 && computerPoints > 21) {
        setTimeout(() => {
            alert('You win');
        }, 300);
    } else {
        setTimeout(() => {
            alert('Computer wins!');
        }, 300);
    }
};






// if (playerPoints <= 21 && (playerPoints - 21) < (computerPoints < 21)) {
//     setTimeout(() => {
//         alert('You win!');
//     }, 300);
// } else {
//     setTimeout(() => {
//         alert('You lose!');
//     }, 300);
// }