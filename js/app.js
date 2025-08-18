import CHALLENGES from "./data.js";
// Core game state management
let lives = 3;
let completedChallenges = [];
let secretCode = "";
let currentChallenge = null;
let gameTimer = null;

let challengeProgress = {
  math: { completed: 0, required: 2 },
  memory: { completed: 0, required: 2 },
  word: { completed: 0, required: 2 },
};

let usedChallenges = {
  math: [],
  memory: [],
  word: [],
};

// Helper functions
const getRandomChallenge = (type) => {
  const challenges = CHALLENGES[type];
  const availableChallenges = challenges.filter(
    (_, index) => !usedChallenges[type].includes(index)
  );

  // If all challenges have been used, reset the used list
  if (availableChallenges.length === 0) {
    usedChallenges[type] = [];
    return challenges[Math.floor(Math.random() * challenges.length)];
  }

  const selectedChallenge =
    availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
  const originalIndex = challenges.indexOf(selectedChallenge);
  usedChallenges[type].push(originalIndex);
  return selectedChallenge;
};

const generateSecretCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 3; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// UI Update functions
const updateHeartDisplay = () => {
  const heartContainer = document.getElementById("heart-container");
  if (heartContainer) {
    heartContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
      //create img element and append it to the heartContainer
      const heartImage = document.createElement("img");
      heartImage.src = "assets/images/heart.png";
      heartImage.className = "heart";
      heartImage.alt = "Heart";
      heartContainer.appendChild(heartImage);
    }
  }
};

const updateCodeDisplay = () => {
  const codeDisplay = document.getElementById("secret-code-display");
  //if the element is found
  if (codeDisplay) {
    codeDisplay.innerHTML = "Code: ";
    for (let i = 0; i < 3; i++) {
      if (i < completedChallenges.length) {
        // Show code character
        const span = document.createElement("span");
        span.textContent = secretCode[i];
        span.style.margin = "0 4px";
        codeDisplay.appendChild(span);
      } else {
        // Show lock image
        const img = document.createElement("img");
        img.src = "assets/images/lock.png";
        img.alt = "Locked";
        img.style.width = "24px";
        img.style.height = "24px";
        img.style.verticalAlign = "middle";
        img.style.margin = "0 4px";
        codeDisplay.appendChild(img);
      }
    }
  }
};

const updateChallengeCards = () => {
  const challengeTypes = ["memory", "math", "word"];
  challengeTypes.forEach((type) => {
    const card = document.getElementById(`${type}-challenge`);
    if (card) {
      const progress = challengeProgress[type];

      // Find or create progress indicator
      let progressIndicator = card.querySelector(".challenge-progress");
      if (!progressIndicator) {
        progressIndicator = document.createElement("div");
        progressIndicator.className = "challenge-progress";
        progressIndicator.style.cssText = `
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 12px;
        `;
        card.style.position = "relative";
        card.appendChild(progressIndicator);
      }

      progressIndicator.textContent = `${progress.completed}/${progress.required}`;

      if (completedChallenges.includes(type)) {
        card.classList.add("completed");
        card.classList.remove("locked");
        card.style.opacity = "0.7";
        card.style.pointerEvents = "none";
        progressIndicator.style.background = "rgba(0,255,0,0.7)";
      } else {
        card.classList.remove("completed");
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
        progressIndicator.style.background = "rgba(0,0,0,0.7)";
      }
    }
  });
};

// Screen navigation
const goToScreen = (screenId) => {
  // Hide all screens
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
    screen.style.display = "none";
  });

  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.style.display = "flex";
    targetScreen.classList.add("active");
  }
};

const challengeCompleted = (challengeType) => {
  challengeProgress[challengeType].completed++;

  // Check if this challenge type is fully completed
  if (
    challengeProgress[challengeType].completed >=
    challengeProgress[challengeType].required
  ) {
    if (!completedChallenges.includes(challengeType)) {
      completedChallenges.push(challengeType);
    }
  }

  updateCodeDisplay();
  updateChallengeCards();

  setTimeout(() => {
    checkWinCondition();
    goToScreen("main-menu");
  }, 1500);
};

const challengeFailed = () => {
  lives--;
  updateHeartDisplay();

  setTimeout(() => {
    if (lives <= 0) {
      // show lose screen
      goToScreen("lose-screen");

      // Play lose sound
      playLoseSound();

      // After 5 seconds, go to splash screen and reset
      setTimeout(() => {
        goToScreen("splash-screen");
        resetGame();
      }, 5000);
    } else {
      goToScreen("main-menu");
    }
  }, 1000);
};

const checkWinCondition = () => {
  if (completedChallenges.length === 3) {
    setTimeout(() => {
      // Show win screen
      goToScreen("win-screen");

      // Play win sound
      playWinSound();

      // After 5 seconds, go to splash screen and reset
      setTimeout(() => {
        goToScreen("splash-screen");
        resetGame();
      }, 5000);
    }, 500);
  }
};

// Audio functions
const playWinSound = () => {
  const winAudio = new Audio("assets/sound/game-win.mp3");
  winAudio.volume = 0.7;
  winAudio.play();
};

const playLoseSound = () => {
  const loseAudio = new Audio("assets/sounds/game-over.mp3");
  loseAudio.volume = 0.7;
  loseAudio.play();
};

const resetGame = () => {
  lives = 3;
  completedChallenges = [];
  secretCode = generateSecretCode();

  challengeProgress = {
    math: { completed: 0, required: 2 },
    memory: { completed: 0, required: 2 },
    word: { completed: 0, required: 2 },
  };

  usedChallenges = {
    math: [],
    memory: [],
    word: [],
  };

  updateHeartDisplay();
  updateCodeDisplay();
  updateChallengeCards();

  // Reset challenge cards
  document.querySelectorAll(".challenge-card").forEach((card) => {
    card.classList.remove("completed", "locked");
    card.style.opacity = "1";
    card.style.pointerEvents = "auto";

    // Remove progress indicators
    const progressIndicator = card.querySelector(".challenge-progress");
    if (progressIndicator) {
      progressIndicator.remove();
    }
  });

  stopTimer();
};

// Timer function
const startTimer = (duration, displayElement, onComplete) => {
  let timeLeft = duration;
  displayElement.textContent = `Time: ${timeLeft}`;

  gameTimer = setInterval(() => {
    timeLeft--;
    displayElement.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      onComplete();
    }
  }, 1000);
};

const stopTimer = () => {
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
};
//############################################################################
// Memory Game Logic
let memorySequence = [];
let playerSequence = [];
let memoryPhase = "showing";
let expectedClickIndex = 0;

const startMemoryGame = () => {
  currentChallenge = getRandomChallenge("memory");
  memorySequence = currentChallenge.sequence;
  playerSequence = [];
  expectedClickIndex = 0;
  memoryPhase = "showing";

  const message = document.getElementById("memory-message");
  const buttons = document.querySelectorAll(".color-button");

  const progress = challengeProgress.memory;
  if (message) message.textContent = "Watch the sequence...";

  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
  });

  // Show sequence after a brief delay
  setTimeout(() => {
    showMemorySequence();
  }, 1000);
};

const showMemorySequence = () => {
  let index = 0;
  const showNext = () => {
    if (index < memorySequence.length) {
      const color = memorySequence[index];
      const button = document.querySelector(`[data-color="${color}"]`);

      if (button) {
        // Light up the color
        button.classList.add("active");
        button.style.transform = "scale(1.1)";

        setTimeout(() => {
          // Turn off the color
          button.classList.remove("active");
          button.style.transform = "scale(1)";
          index++;

          // Show next color after a pause
          setTimeout(showNext, 500);
        }, 800);
      } else {
        // button not found, skip to next
        index++;
        setTimeout(showNext, 100);
      }
    } else {
      setTimeout(() => {
        startPlayerTurn();
      }, 1000);
    }
  };
  showNext();
};

const startPlayerTurn = () => {
  memoryPhase = "playing";
  const message = document.getElementById("memory-message");
  if (message) message.textContent = "Now click the colors in the same order!";

  // Enable all buttons
  document.querySelectorAll(".color-button").forEach((btn) => {
    btn.disabled = false;
    btn.style.opacity = "1";
  });

  // Start timer for player input
  const timer = document.getElementById("memory-timer");
  if (timer) {
    startTimer(20, timer, () => {
      memoryPhase = "complete";
      challengeFailed();
    });
  }
};

function handleMemoryClick(color) {
  if (memoryPhase !== "playing") return;

  // Add visual feedback for click
  const button = document.querySelector(`[data-color="${color}"]`);
  if (button) {
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);
  }

  // Check if this is the correct color for this position
  if (color !== memorySequence[expectedClickIndex]) {
    // Wrong color clicked
    memoryPhase = "complete";
    stopTimer();

    // Disable all buttons
    document.querySelectorAll(".color-button").forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    const message = document.getElementById("memory-message");
    if (message) message.textContent = "Wrong sequence! Try again.";

    setTimeout(() => challengeFailed(), 1000);
    return;
  }

  // Correct color clicked
  playerSequence.push(color);
  expectedClickIndex++;

  //if sequence is complete
  if (expectedClickIndex >= memorySequence.length) {
    // completed the sequence correctly!
    memoryPhase = "complete";
    stopTimer();

    // Disable all buttons
    document.querySelectorAll(".color-button").forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
    });

    const message = document.getElementById("memory-message");
    if (message) message.textContent = "Perfect! Sequence completed!";

    setTimeout(() => challengeCompleted("memory"), 1000);
  }
}
//#############################################################
// Math Game Logic
const startMathGame = () => {
  currentChallenge = getRandomChallenge("math");
  const problemElement = document.getElementById("math-problem");
  const inputElement = document.getElementById("math-input");
  const timerElement = document.getElementById("math-timer");

  if (problemElement)
    problemElement.textContent = ` ${currentChallenge.problem} = ?`;

  if (inputElement) {
    inputElement.value = "";
    inputElement.focus();
  }

  if (timerElement) {
    startTimer(currentChallenge.timeLimit, timerElement, () =>
      challengeFailed()
    );
  }
};

const checkMathAnswer = () => {
  const inputElement = document.getElementById("math-input");
  if (!inputElement) return;

  const userAnswer = parseInt(inputElement.value);
  stopTimer();

  if (userAnswer === currentChallenge.answer) {
    challengeCompleted("math");
  } else {
    challengeFailed();
  }
};

//####################################################
// Word Game Logic
const startWordGame = () => {
  currentChallenge = getRandomChallenge("word");

  const scrambledElement = document.getElementById("word-scrambled");
  const hintElement = document.getElementById("word-hint");
  const inputElement = document.getElementById("word-input");
  const timerElement = document.getElementById("word-timer");

  if (scrambledElement)
    scrambledElement.textContent = currentChallenge.scrambled;

  if (hintElement) hintElement.textContent = `Hint: ${currentChallenge.hint}`;
  if (inputElement) {
    inputElement.value = "";
    inputElement.focus();
  }

  if (timerElement) {
    startTimer(currentChallenge.timeLimit, timerElement, () =>
      challengeFailed()
    );
  }
};

const checkWordAnswer = () => {
  const inputElement = document.getElementById("word-input");
  if (!inputElement) return;

  const userAnswer = inputElement.value.toUpperCase().trim();
  stopTimer();

  if (userAnswer === currentChallenge.answer) {
    challengeCompleted("word");
  } else {
    challengeFailed();
  }
};

//################################################################
// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize game
  secretCode = generateSecretCode();
  updateCodeDisplay();
  updateHeartDisplay();
  updateChallengeCards();

  // Background music setup
  const backgroundMusic = new Audio("assets/sounds/background-music.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.autoplay;
  backgroundMusic.play();

  // Navigation event listeners
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      goToScreen("main-menu");
    });
  }

  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      goToScreen("splash-screen");
    });
  }

  //restart btn event
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", resetGame);
  }

  // Challenge selection event listeners
  const memoryChallenge = document.getElementById("memory-challenge");
  if (memoryChallenge) {
    memoryChallenge.addEventListener("click", () => {
      if (!completedChallenges.includes("memory")) {
        goToScreen("memory-game");
        setTimeout(startMemoryGame, 100);
      }
    });
  }

  const mathChallenge = document.getElementById("math-challenge");
  if (mathChallenge) {
    mathChallenge.addEventListener("click", () => {
      if (!completedChallenges.includes("math")) {
        goToScreen("math-game");
        setTimeout(startMathGame, 100);
      }
    });
  }

  const wordChallenge = document.getElementById("word-challenge");
  if (wordChallenge) {
    wordChallenge.addEventListener("click", () => {
      if (!completedChallenges.includes("word")) {
        goToScreen("word-scramble");
        setTimeout(startWordGame, 100);
      }
    });
  }

  // Memory game event listeners
  document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", () => {
      const color = button.getAttribute("data-color");
      handleMemoryClick(color);
    });
  });

  const memoryBackBtn = document.getElementById("memory-back-btn");
  if (memoryBackBtn) {
    memoryBackBtn.addEventListener("click", () => {
      stopTimer();
      goToScreen("main-menu");
    });
  }

  // Math game event listeners
  const mathSubmitBtn = document.getElementById("math-submit");
  if (mathSubmitBtn) {
    mathSubmitBtn.addEventListener("click", checkMathAnswer);
  }

  const mathInput = document.getElementById("math-input");
  if (mathInput) {
    mathInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkMathAnswer();
      }
    });
  }

  const mathBackBtn = document.getElementById("math-back-btn");
  if (mathBackBtn) {
    mathBackBtn.addEventListener("click", () => {
      stopTimer();
      goToScreen("main-menu");
    });
  }

  // Word game event listeners
  const wordSubmitBtn = document.getElementById("word-submit");
  if (wordSubmitBtn) {
    wordSubmitBtn.addEventListener("click", checkWordAnswer);
  }

  const wordInput = document.getElementById("word-input");
  if (wordInput) {
    wordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkWordAnswer();
      }
    });
  }

  const wordBackBtn = document.getElementById("word-back-btn");
  if (wordBackBtn) {
    wordBackBtn.addEventListener("click", () => {
      stopTimer();
      goToScreen("main-menu");
    });
  }
});
