const goToScreen = (screenId) => {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.style.display = "none";
  });

  // Show the specified screen
  document.getElementById(screenId).style.display = "block";
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    goToScreen("main-menu");
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    goToScreen("splash-screen");
  });
  generateSecretCode();
});

//Core game state management
let lives = 3;
let completedChallenges = [];
let secretCode = "";
let currentChallenge = null;
let gameTimer = null;

const generateSecretCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const updateHeartDisplay = () => {
  const heartContainer = document.getElementById("heart-container");
  heartContainer.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤️";
    heartContainer.appendChild(heart);
  }
};

const updateCodeDisplay = () => {
  const codeDisplay = document.getElementById("secret-code-display");
  codeDisplay.textContent = `Secret Code: ${secretCode}`;
};

const checkWinCondition = () => {
  if (completedChallenges.length === 9) {
    alert("Congratulations! You've completed enough challenges to win!"); //will change it later
    goToScreen("win-screen");
  }
};

const resetGame = () => {
  lives = 3;
  completedChallenges = [];
  secretCode = generateSecretCode();
  updateHeartDisplay();
  updateCodeDisplay();
  updateChallengeCards();

  // Reset challenge cards
  document.querySelectorAll(".challenge-card").forEach((card) => {
    card.classList.remove("completed", "locked");
  });
};
