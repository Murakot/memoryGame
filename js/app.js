// Starting variables
var timer = null;
var openCards;
var matched = 0;
var totalSeconds;
var moves;
var moveCounter = document.querySelector('.moves');

// Rating
var score = document.querySelector('.stars');
var ratingCode = `<li><i class="fa fa-star"></i></li>`;
var ratingScore = 3;
var ratingStars = ratingCode.repeat(ratingScore);
score.innerHTML = ratingStars;

function updateRating() {
    if (moves > 13) {
        if (ratingScore != 2) {
            ratingScore = 2;
            ratingStars = ratingCode.repeat(ratingScore);
            score.innerHTML = ratingStars;
        }
    }
    if (moves > 23) {
        if (ratingScore != 1) {
            ratingScore = 1;
            ratingStars = ratingCode.repeat(ratingScore);
            score.innerHTML = ratingStars;
        }
    }
}

// Card variables
var deck = document.querySelector('.deck');
var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];

// Popup Modal variables
var modal = document.getElementById('win-popup');
var modalTime = document.getElementById('time_results');
var modalMoves = document.getElementById('moves_results');
var modalScore = document.getElementById('score_results');

function winPopup() {
    console.log('Win!');
    modal.style.display = "block";
}

/*
 * Display the cards on the page
 * - shuffle the list of cards using the provided "shuffle" method below
 * - loop through each card and create its HTML
 * - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Starting the Game
function initGame() {
    openCards = [];
    totalSeconds = 0;
    moves = 0;
    var cardHTML = shuffle(cards).map(function(card) {
        return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
    });

    deck.innerHTML = cardHTML.join('');
}

initGame();

// Timer!
var minutesLabel = document.querySelector('.minutes');
var secondsLabel = document.querySelector('.seconds');

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
// End of Timer

// Listening to clicks
var allCards = document.querySelectorAll('.card');

moveCounter.innerText = `Moves: ${moves}`;

// Starting to click!
allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {

        if (timer === null) {
            timer = setInterval(setTime, 1000);
        }

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];

                    // Counting matches.
                    matched += 1;
                    // if 8 matched - you won!
                    switch (matched) {
                        case 8:
                            setTimeout(function() {
                                winPopup();
                                modalTime.innerText = `${pad(parseInt(totalSeconds / 60))}:${pad(totalSeconds % 60)}`;
                                modalMoves.innerText = `${moves}`;
                                modalScore.innerText = `${ratingScore} Stars!`;
                            }, 1000);
                            break;
                    }

                } else {
                    // if cards doesn't match - turn them back
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });
                        openCards = [];
                    }, 1000);
                }
                // Counting moves
                moves += 1;
                moveCounter.innerText = `Moves: ${moves}`;
                updateRating();
            }
        }
    });
});