const slideUp = new Audio("audio/slide-up.mp3");
const slideDown = new Audio("audio/slide-down.mp3");
const fanfare = new Audio("audio/fanfare.mp3");

let guesses = 0;

let wins = 0;

function currentMaxNumber() {
  console.log("Wins:", wins);

  const maxNumber = Math.round(100 * Math.pow(10, wins));

  console.log("Max number:", maxNumber);

  return maxNumber;
}

function setRandomNumber() {
  const maxNumber = currentMaxNumber();

  const newRandomNumber = Math.round(Math.random() * maxNumber);

  console.log("Random number:", newRandomNumber);

  return newRandomNumber;
}

let randomNumber = setRandomNumber();

function handleGuess() {
  // Update the number of guesses
  guesses = guesses + 1;

  const guessField = document.getElementById("guessField");
  const guessNumber = guessField.value || 0;

  console.log("Guess number:", guessNumber);

  if (guessNumber > randomNumber) {
    console.log("Too high");
    document.getElementById("tooLow").classList.remove("show");
    document.getElementById("tooHigh").classList.add("show");
    slideUp.play();
  } else if (guessNumber < randomNumber) {
    console.log("Too low");
    document.getElementById("tooLow").classList.add("show");
    document.getElementById("tooHigh").classList.remove("show");
    slideDown.play();
  } else {
    console.log("You win!");
    document.getElementById("tooLow").classList.remove("show");
    document.getElementById("tooHigh").classList.remove("show");
    document.getElementById("win").classList.add("show");
    document.getElementById("guessField").setAttribute("disabled", true);
    document.body.classList.add("win");
    fanfare.play();

    // Display the number of guesses
    document.getElementById("guessesNumber").innerText = guesses;

    // Add a win to make the game harder
    wins = wins + 1;
  }
}

function handleReset() {
  randomNumber = setRandomNumber();
  document.getElementById("tooLow").classList.remove("show");
  document.getElementById("tooHigh").classList.remove("show");
  document.getElementById("win").classList.remove("show");
  document.body.classList.remove("win");
  document.getElementById("guessField").removeAttribute("disabled");
  document.getElementById("guessField").value = "";

  // Update the max number
  document.getElementById("maxNumber").innerText = currentMaxNumber();

  // Reset guesses
  guesses = 0;
}

function handlePressEnter(event) {
  if (event.key === "Enter") {
    handleGuess();
  }
}