const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const resetBtn = document.querySelector(".reset-btn");
const autoPlayBtn = document.querySelector(".auto-play-btn");

const computerMoveText = document.querySelector(".computer-move");
const userMoveText = document.querySelector(".user-move");
const result = document.querySelector(".result");
const scoreText = document.querySelector(".score");

let wins = 0;
let losses = 0;
let ties = 0;

let autoPlayToggle = false;
let autoPlayInterval;

function getComputerMove() {
  const randNum = Math.floor(Math.random() * 3);
  return randNum === 0 ? "Rock" : randNum === 1 ? "Paper" : "Scissors";
}

function updateScoreDisplay() {
  scoreText.innerText = `Wins: ${wins} Losses: ${losses} Ties: ${ties}`;
  localStorage.setItem("gameScore", JSON.stringify({ wins, losses, ties }));
}

function playGame(computerMove, userMove) {
  result.innerText =
    computerMove === userMove
      ? (ties++, "Tie!")
      : ((losses +=
          (computerMove === "Rock" && userMove === "Scissors") ||
          (computerMove === "Paper" && userMove === "Rock") ||
          (computerMove === "Scissors" && userMove === "Paper")
            ? 1
            : 0),
        (computerMove === "Rock" && userMove === "Scissors") ||
        (computerMove === "Paper" && userMove === "Rock") ||
        (computerMove === "Scissors" && userMove === "Paper")
          ? "Computer wins!"
          : (wins++, "User wins!"));

  updateScoreDisplay();
}

rockBtn.addEventListener("click", () => {
  const computerMove = getComputerMove();
  userMoveText.innerText = `User: Rock`;
  computerMoveText.innerText = `Computer: ${computerMove}`;
  playGame(computerMove, "Rock");
});

paperBtn.addEventListener("click", () => {
  const computerMove = getComputerMove();
  userMoveText.innerText = `User: Paper`;
  computerMoveText.innerText = `Computer: ${computerMove}`;
  playGame(computerMove, "Paper");
});

scissorsBtn.addEventListener("click", () => {
  const computerMove = getComputerMove();
  userMoveText.innerText = `User: Scissors`;
  computerMoveText.innerText = `Computer: ${computerMove}`;
  playGame(computerMove, "Scissors");
});

resetBtn.addEventListener("click", () => {
  wins = 0;
  losses = 0;
  ties = 0;
  userMoveText.innerText = `User:`;
  computerMoveText.innerText = `Computer:`;
  result.innerText = "";
  updateScoreDisplay();
});

autoPlayBtn.addEventListener("click", () => {
  autoPlayToggle = !autoPlayToggle;
  autoPlayBtn.innerText = autoPlayToggle ? "Stop Auto Play" : "Start Auto Play";

  if (autoPlayToggle) {
    autoPlayInterval = setInterval(() => {
      const userMove = getComputerMove();
      const computerMove = getComputerMove();
      userMoveText.innerText = `User: ${userMove}`;
      computerMoveText.innerText = `Computer: ${computerMove}`;
      playGame(computerMove, userMove);
    }, 1000);
  } else {
    clearInterval(autoPlayInterval);
  }
});

window.onload = () => {
  const storedScore = JSON.parse(localStorage.getItem("gameScore"));

  if (storedScore) {
    wins = storedScore.wins || 0;
    losses = storedScore.losses || 0;
    ties = storedScore.ties || 0;
  }

  updateScoreDisplay();
};
