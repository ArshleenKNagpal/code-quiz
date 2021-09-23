let askQuestions = document.querySelector(".card-questions");
let askAnswers1 = document.querySelector(".choice-container-1");
let askAnswers2 = document.querySelector(".choice-container-2");
let askAnswers3 = document.querySelector(".choice-container-3");
let askAnswers4 = document.querySelector(".choice-container-4");
// let choiceOptions = document.querySelector(".choice-container");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

let numBlanks = 0;
let winCounter = 0;
let loseCounter = 0;
let isWin = false;
let timer;
let timerCount;
let ChosenAnswer = [];

// TODO: google a display a list one at a time using JavaScript
// TODO: Google set HTML text using JavaScript

// Array of words the user will guess
let questions =
  [{
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleaans", "alerts", "numbers"],
    rightanswer: "alerts"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    rightanswer: "console.log"
  },
  {
    question: "A condition in an if / else statement is enclosed withing ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    rightanswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    rightanswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    rightanswer: "quotes"
  }]


// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 75;

  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderQuestion(0)
  renderAnswers(0)
  startTimer()
}


// The winGame function is called when the win condition is met
function winGame() {
  askQuestions.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  askQuestions.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses();
  clearInterval(timer);
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}


// Creates questions on screen
function renderQuestion(i) {
  askQuestions.textContent = questions[i].question;
}

function renderAnswers(i) {

  askAnswers1.textContent =
    questions[i].choices[0];

    askAnswers2.textContent =
    questions[i].choices[1];

    askAnswers3.textContent =
    questions[i].choices[2];

    askAnswers4.textContent =
    questions[i].choices[3];

    verifyAnswer()
}

function verifyAnswer () {
// ChosenAnswer = questions[i].rightanswer;
askAnswers1.addEventListener("click", checkAnswer);
askAnswers2.addEventListener("click", checkAnswer);
askAnswers3.addEventListener("click", checkAnswer);
askAnswers4.addEventListener("click", checkAnswer);
}


// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  let storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  let storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkAnswer() {
  let i = 0;
  console.log(this.textContent)
  if (this.textContent === questions[i].rightanswer) {
  }
  i++;
renderQuestion(i)
renderAnswers(i)
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
let resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
