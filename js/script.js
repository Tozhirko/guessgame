const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    // random object from words.js
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; // random word from random object
    maxGuesses = 9; corrects = []; incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

      let html = "";
      for (let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>'
      }
      inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
      if(word.includes(key)) {    // if letter = found
        for (let i = 0; i < word.length; i++) {
          if(word[i] === key) {
            corrects.push(key)
            inputs.querySelectorAll("input")[i].value = key;
          }
        }
      } else {
        maxGuesses--; // decrease by 1
        incorrects.push(` ${key}`);
      }
      guessLeft.innerText = maxGuesses;
      wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    setTimeout(() => {
      if(corrects.length === word.length) { // if user isn't dumb and didn't failed
        alert("You succeeded!(so goooood)");
        randomWord(); // new word for non-dumb user
      } else if(maxGuesses < 1) { // if user is dumb and failed
        alert("You failed!(so baaaaad)");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
      }
    });
}

resetBtn.addEventListener("click", randomWord);
document.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
