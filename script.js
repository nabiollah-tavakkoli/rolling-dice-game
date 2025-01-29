'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); // By ID
const score1El = document.getElementById('score--1'); // By ID

const current0El = document.getElementById('current--0'); // By ID
const current1El = document.getElementById('current--1'); // By ID

const diceEl = document.querySelector('.dice'); // By Class

const btnNew = document.querySelector('.btn--new'); // By Class
const btnRoll = document.querySelector('.btn--roll'); // By Class
const btnHold = document.querySelector('.btn--hold'); // By Class

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// scores Hold total score of player 0 and 1
const switchPlayer = function () {
  // Switch to next player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-${dice}.png`;

    // Check for the Rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the current score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent =
        'WINNER';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
