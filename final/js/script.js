"use strict";

const warningEl = document.querySelector(".box__note--text");
const formEl = document.querySelector(".box__actions");
const inputEl = document.querySelector("#user-guess");
const chancesEl = document.querySelector(".box__limit--text");
const tryAgainBtn = document.querySelector(".box__actions--retry--button");
const randomNumberEl = document.querySelector(".box--items-number");

const generateRandomNumber = () => {
  const randomNumber = Math.ceil(Math.random() * 100);
  return randomNumber;
};

const checkResult = (randomNum, inputNum) => {
  if (inputNum === randomNum) {
    warningEl.textContent = "Congrats you win🎉";
    randomNumberEl.textContent = randomNumber;
    return true;
  }

  if (inputNum - randomNum > 0) {
    warningEl.textContent = "Please enter smaller number🙏";
  }

  if (inputNum - randomNum < 0) {
    warningEl.textContent = "Please enter bigger number🙏";
  }

  return false;
};

let chances = 7;
let randomNumber = generateRandomNumber();

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  chances--;

  if (chances < 0) {
    return;
  }

  if (chances == 0) {
    chancesEl.textContent = `Number of guesses: ${chances}`;

    const inputValue = +event.target.key.value;
    let isWon = checkResult(randomNumber, inputValue);

    if (!isWon) {
      warningEl.textContent = "Unfortunately, you have lost😭";
      randomNumberEl.textContent = randomNumber;
    }

    return;
  }

  chancesEl.textContent = `Number of guesses: ${chances}`;

  const inputValue = +event.target.key.value;

  checkResult(randomNumber, inputValue);

  inputEl.value = "";
});

tryAgainBtn.addEventListener("click", () => {
  randomNumber = generateRandomNumber();

  chances = 7;
  chancesEl.textContent = `Number of guesses: ${chances}`;

  randomNumberEl.textContent = "?";
  inputEl.value = "";

  warningEl.textContent = "Start guessing...";
});
