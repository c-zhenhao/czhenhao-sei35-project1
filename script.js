"use strict";

// global variables
let gameAnswer = [];
let guess = [];
let options = document.getElementsByClassName("option");
let inputGuess = document.getElementsByClassName("guess");
let pinsContainer = document.getElementsByClassName("pins");
let answerSocket = document.getElementsByClassName("answer-socket");
let guessIncrement = 0;
let pinsIncrement = 0;
let pegs = [
  "blue",
  "red",
  "yellow",
  "green",
  "purple",
  "brown",
  // "pink",
  // "orange",
];

// console.log(inputGuess); // debugging; delete in final
// console.log(pinsContainer); // debugging; delete in final
// console.log(options); // debugging; delete in final
// console.log(pegs.length); // Object.keys(pegs).length

// generate game answer
function generateGameAnswer() {
  const ans1 = Math.floor(Math.random() * pegs.length);
  const ans2 = Math.floor(Math.random() * pegs.length);
  const ans3 = Math.floor(Math.random() * pegs.length);
  const ans4 = Math.floor(Math.random() * pegs.length);

  console.log(`code is ${ans1 + 1} ${ans2 + 1} ${ans3 + 1} ${ans4 + 1}`); // debugging; gameshark delete in final

  gameAnswer = [pegs[ans1], pegs[ans2], pegs[ans3], pegs[ans4]];
  console.log(gameAnswer);
}
generateGameAnswer();

// add event listener for the colour options
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", insertGuess);
}

// add event listener for the other buttons
let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", deleteButton);

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submitGuess);

let surrenderBtn = document.getElementById("surrender");
surrenderBtn.addEventListener("click", surrenderButton);

// add function to add to guess array
function insertGuess() {
  if (guess.length >= 4) {
    if (confirm("you have already entered 4 inputs - submit?") === true) {
      submitGuess();
    }
  } else {
    let slots = inputGuess[guessIncrement].getElementsByClassName("socket");

    slots[guess.length].className =
      slots[guess.length].className + " peg " + this.id;
    guess.push(this.id);

    console.log(guess); // debugging; delete in final
  }
}

// add function to delete from guess array
function deleteButton() {
  if (guess.length !== 0) {
    let slots = inputGuess[guessIncrement].getElementsByClassName("socket");
    slots[guess.length - 1].className = "socket";
    guess.pop();
    console.log(guess); // debugging; delete in final
  } else {
    // maybe prompt user that theres nothing else to delete?
    console.log("guess array is empty"); // debugging; delete in final
  }
}

// add function to submitGuess
function submitGuess() {
  if (guess.length < 4) {
    alert("please enter 4 colours");
  } else if (guess.length === 4) {
    if (compare()) {
      gameOver();
      console.log("🎉🎉🎉🎉🎉 winnnn 🎉🎉🎉🎉🎉🎉"); // debugging; delete in final
      alert("🎉🎉🎉🎉🎉 winnnn 🎉🎉🎉🎉🎉🎉");
    } else {
      guessIncrement += 1;
      console.log("try again 😔😔😔"); // debugging; delete in final
    }
  }

  console.log(`current attempt: ${guessIncrement}`); // debugging; delete in final

  // add in if guessIncrement is the max of inputGuess, then game over
  if (guessIncrement === inputGuess.length && !compare()) {
    gameOver();
  }
}

// add pins
function insertPin(type) {
  let sockets =
    pinsContainer[pinsIncrement].getElementsByClassName("pins-socket");
  sockets[0].className = "socket " + type;
}

// game main logic here
function compare() {
  let match = true;
  let answerCopy = gameAnswer.slice(0);

  let blackPins = 0;
  let whitePins = 0;

  //steps to compare
  // 1. check if pins are in correct position - if true, its a "hit"
  for (let i = 0; i < gameAnswer.length; i++) {
    if (guess[i] === gameAnswer[i]) {
      insertPin("hit");
      answerCopy[i] = 0;
      guess[i] = -1;
      blackPins++;
    } else {
      match = false;
    }
  }

  // 2. also check for pins that are correct colour but wrong position - if true its a "pass"
  for (let j = 0; j < gameAnswer.length; j++) {
    if (answerCopy.indexOf(guess[j]) !== -1) {
      insertPin("pass");
      answerCopy[answerCopy.indexOf(guess[j])] = 0;
      whitePins++;
    }
  }

  console.log(`number of blackPins: ${blackPins}`); // debugging; delete in final
  console.log(`number of whitePins: ${whitePins}`); // debugging; delete in final

  pinsIncrement += 1; // next set of pins
  guess = []; // clear guess for the next row

  return match;
}

// add showAnswer
function showAnswer() {
  for (let k = 0; k < answerSocket.length; k++) {
    answerSocket[k].className += " " + gameAnswer[k];
    answerSocket[k].innerHTML = " "; // remove the ? from the socket
  }
}

// add gameOver
function gameOver() {
  // add disable buttons to prevent anymore input
  for (let ii = 0; ii < options.length; ii++) {
    options[ii].removeEventListener("click", insertGuess);
  }

  deleteBtn.removeEventListener("click", deleteButton);
  submitButton.removeEventListener("click", submitGuess);
  surrenderBtn.removeEventListener("click", surrenderButton);

  showAnswer();
  alert("game over!");
}

// surrender function
function surrenderButton() {
  alert("never give up never surrender");
}

// add gameState

// add reset everything (f5? lol)

// add newGame/restartGame
//// clear guess
//// clearBoard
//// clear guessSockets
//// clear pinsSockets
//// clear answerSockets

// keyboard shortcuts
document.addEventListener("keydown", keyCheck);

function keyCheck(event) {
  let KeyID = event.keyCode;
  switch (KeyID) {
    case 49:
    case 66:
      event.preventDefault();
      document.getElementById("blue").click();
      break;

    case 50:
    case 82:
      event.preventDefault();
      document.getElementById("red").click();
      break;

    case 51:
    case 89:
      event.preventDefault();
      document.getElementById("yellow").click();
      break;

    case 52:
    case 71:
      event.preventDefault();
      document.getElementById("green").click();
      break;

    case 53:
    case 80:
      event.preventDefault();
      document.getElementById("purple").click();
      break;

    case 54:
    case 87:
      event.preventDefault();
      document.getElementById("brown").click();
      break;

    // case 55:
    // case 73:
    //   event.preventDefault();
    //   document.getElementById("pink").click();
    //   break;

    // case 56:
    // case 79:
    //   event.preventDefault();
    //   document.getElementById("orange").click();
    //   break;

    case 8:
    case 46:
    case 27:
      event.preventDefault();
      document.getElementById("delete").click();
      break;

    case 13:
    case 186:
      event.preventDefault();
      document.getElementById("submit").click();
      break;
  }
}
