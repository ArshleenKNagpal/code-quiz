let askQuestions = document.querySelector(".card-questions");
let askAnswers1 = document.querySelector(".choice-container-1");
let askAnswers2 = document.querySelector(".choice-container-2");
let askAnswers3 = document.querySelector(".choice-container-3");
let askAnswers4 = document.querySelector(".choice-container-4");
let questionNumber = 0
let win = document.querySelector(".score");
let timerElement = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

let numBlanks = 0;
let scoreCounter = 0;
let isWin = false;
let timer;
let timerCount;
let ChosenAnswer = [];


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
}
// Calls init() so that it fires when page opened
init();


// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 75;
  questionNumber = 0

  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderQuestion(questionNumber)
  startTimer()
}

// The setTimer function starts and stops the timer and triggers winGame() and GameOver()
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
      GameOver();
    }
  }, 1000);
}


// Creates questions on screen
function renderQuestion(i) {
  askQuestions.textContent = questions[i].question;

  askAnswers1.textContent =
    questions[i].choices[0];

  askAnswers2.textContent =
    questions[i].choices[1];

  askAnswers3.textContent =
    questions[i].choices[2];

  askAnswers4.textContent =
    questions[i].choices[3];
}

function verifyAnswer() {
  askAnswers1.addEventListener("click", checkAnswer);
  askAnswers2.addEventListener("click", checkAnswer);
  askAnswers3.addEventListener("click", checkAnswer);
  askAnswers4.addEventListener("click", checkAnswer);
}
verifyAnswer()

// Updates win count on screen and sets win count to client storage
function setScores() {
  win.textContent = scoreCounter;
  localStorage.setItem("scoreCount", scoreCounter);
}



// The winGame function is called when the win condition is met
function winGame() {
  scoreCounter++
  startButton.disabled = false;
  setScores()
}

// The GameOver function is called when timer reaches 0
function GameOver() {
  askQuestions.textContent = "GAME OVER";
  startButton.disabled = false;
  clearInterval(timer);
}



// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  let storedWins = localStorage.getItem("scoreCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    scoreCounter = 0;
  } else {
    // If a value is retrieved from client storage set the scoreCounter to that value
    scoreCounter = storedWins;
  }
  //Render win count to page
  win.textContent = scoreCounter;
}


function checkAnswer() {

  if (this.textContent === questions[questionNumber].rightanswer) {
  } else {
    timerCount = timerCount - 10
  }
  questionNumber++;
  if (questionNumber < questions.length) {
    renderQuestion(questionNumber)
  }
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);



// Bonus: Add reset button
let resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  scoreCounter = 0;
  // Renders score count and sets them into client storage
  setScores()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
