/**
 * 2C - Two of clubs 
 * 2D - Two of diamonds
 * 2H - Two of hearts
 * 2S - Two of spades
 */

let deck = [];
const cardLetters = ['C', 'D', 'H', 'S'];
const specialCards = ['A', 'J', 'Q', 'K'];

//Creates and returns a new randomized deck
const createDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (const letter of cardLetters) {
            deck.push(i + letter);
        }
    }

    for (const letter of cardLetters) {
        for (const card of specialCards) {
            deck.push(card + letter);
        }
    }

    return shuffleDeck(deck);
}

//Shuffle the deck
function shuffleDeck(deck = []) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const playerDeck = createDeck();
//const playerDeck = ['4S', '7H', '5D', '5S', '8H', '6D', '9D', '3D', 'JD', '8D', '2C', '3C', 'QH', '7S', '2H', '5H', '6S', 'AS', 'KH', '4C', '2S', '2D', '3H', '8S', 'KD', 'QC', '3S', 'KS', 'KC', 'JS', 'AC', 'QD', '7C', 'JH', 'QS', '9H', '6H', '6C', '9C', '4H', '7D', '9S', 'AD', '4D', 'AH', '5C', 'JC', '8C'];

//Request a card
const requestCard = () => {
    if(playerDeck.length === 0) return alert('No cards remaining');
    let newCard = playerDeck.pop();
    console.log("Remaining cards: " + playerDeck.length + ", last delivered card: " + newCard);
    return newCard;
}