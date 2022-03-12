// Mutable Variables
let turn = 1;
let guesses = [];
let field = document.querySelector('input.guessField');

// Imutable
const lastResultField = document.querySelector('p.lastResult');
const lowOrHiField = document.querySelector('p.lowOrHi');
const randomNumber = randomNumberFn()
const submit = document.body.getElementsByClassName('guessSubmit')[0]

submit.addEventListener('click', nextTurn)

function nextTurn() {
    ++turn
    guesses.push(field.value);
    guesses = guesses.map(Number)
    field.value = '';
    const prevGuesses = document.querySelector('p.guesses');
    prevGuesses.innerHTML = `Previous: ${guesses}`;
    results();
}

function results() {

    let lastUserGuess = guesses[guesses.length - 1]; // Gets the last user guess from the array
    // Check if the the last users guess is Too Low, Too High or Correct
    let lowResult = lastUserGuess < randomNumber;
    let highResult = lastUserGuess > randomNumber;
    let rightResult = lastUserGuess == randomNumber;

    // User only has 10 Turn to figure out.
    if (turn == 11) {
        lowOrHiField.innerHTML = 'GAME OVER';
        newGame();
    }
    else if (lowResult) {
        lowOrHiField.innerHTML = 'Last Guess: Too Low';
        wrong(lowOrHiField);
    }
    else if (highResult) {
        lowOrHiField.innerHTML = 'Last Guess: Too High';
        wrong(lowOrHiField);
    }
    else if (rightResult) {
        lowOrHiField.innerHTML = 'You Win! Congratulations';
        right(lowOrHiField);
        newGame();
    }
}

function wrong(lastGuess) {
    lastGuess.style.backgroundColor = "red";
    lastGuess.style.color = "white";
}

function right(lastGuess) {
    lastGuess.style.backgroundColor = "green";
    lastGuess.style.color = "white";
}

function randomNumberFn() {
    return Math.floor(Math.random() * (100));
}

function newGame() {
    submit.disabled = true;
    field.disabled = true;
    const button = document.createElement('button')
    document.body.appendChild(button);
    button.textContent = 'Start New Game';
    const newGame = document.querySelector('button');
    newGame.addEventListener('click', refresh)
}

function refresh() {
    document.location.reload(true);
}