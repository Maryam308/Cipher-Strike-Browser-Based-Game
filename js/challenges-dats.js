const CHALLENGES = {
  math: [
    {
      problem: "15 + 27",
      answer: 42,
      timeLimit: 10,
    },
    {
      problem: "8 × 9",
      answer: 72,
      timeLimit: 8,
    },
    {
      problem: "144 ÷ 12",
      answer: 12,
      timeLimit: 12,
    },
    {
      problem: "25 - 17",
      answer: 8,
      timeLimit: 6,
    },
    {
      problem: "√64",
      answer: 8,
      timeLimit: 15,
    },
    {
      problem: "23 + 49",
      answer: 72,
      timeLimit: 10,
    },
    {
      problem: "7 × 6",
      answer: 42,
      timeLimit: 8,
    },
    {
      problem: "81 ÷ 9",
      answer: 9,
      timeLimit: 12,
    },
  ],

  memory: [
    {
      sequence: ["red", "blue", "green", "yellow"],
      difficulty: 1,
      showTime: 3000,
    },
    {
      sequence: ["red", "blue", "red", "green", "yellow", "blue"],
      difficulty: 2,
      showTime: 4000,
    },
    {
      sequence: ["green", "yellow", "red", "blue", "green", "red", "yellow"],
      difficulty: 3,
      showTime: 5000,
    },
    {
      sequence: ["blue", "red", "yellow", "green", "blue"],
      difficulty: 2,
      showTime: 3500,
    },
    {
      sequence: [
        "yellow",
        "green",
        "blue",
        "red",
        "yellow",
        "green",
        "blue",
        "red",
      ],
      difficulty: 3,
      showTime: 6000,
    },
  ],

  logic: [
    {
      pattern: [2, 4, 6, 8, "?"],
      answer: 10,
      hint: "Even numbers sequence",
      timeLimit: 20,
    },
    {
      pattern: [1, 4, 9, 16, "?"],
      answer: 25,
      hint: "Perfect squares",
      timeLimit: 25,
    },
    {
      pattern: [5, 10, 15, 20, "?"],
      answer: 25,
      hint: "Multiples of 5",
      timeLimit: 15,
    },
    {
      pattern: [1, 2, 4, 8, "?"],
      answer: 16,
      hint: "Powers of 2",
      timeLimit: 30,
    },
    {
      pattern: [3, 6, 12, 24, "?"],
      answer: 48,
      hint: "Double each time",
      timeLimit: 25,
    },
  ],

  reflex: [
    {
      targets: 3,
      timeLimit: 8000,
      targetLifespan: 2000,
      difficulty: "easy",
    },
    {
      targets: 5,
      timeLimit: 10000,
      targetLifespan: 1500,
      difficulty: "medium",
    },
    {
      targets: 7,
      timeLimit: 12000,
      targetLifespan: 1000,
      difficulty: "hard",
    },
    {
      targets: 4,
      timeLimit: 9000,
      targetLifespan: 1800,
      difficulty: "easy",
    },
    {
      targets: 6,
      timeLimit: 11000,
      targetLifespan: 1200,
      difficulty: "medium",
    },
  ],

  word: [
    {
      scrambled: "TENGAI",
      answer: "AGENT",
      hint: "Undercover operative",
      difficulty: 1,
      timeLimit: 20,
    },
    {
      scrambled: "SIIMONS",
      answer: "MISSION",
      hint: "Secret assignment",
      difficulty: 1,
      timeLimit: 25,
    },
    {
      scrambled: "REHCIP",
      answer: "CIPHER",
      hint: "Secret code",
      difficulty: 2,
      timeLimit: 30,
    },
    {
      scrambled: "GADESU",
      answer: "GADGET",
      hint: "Spy equipment",
      difficulty: 1,
      timeLimit: 20,
    },
    {
      scrambled: "TELVAU",
      answer: "VAULT",
      hint: "Secure storage",
      difficulty: 1,
      timeLimit: 15,
    },
    {
      scrambled: "CETRSE",
      answer: "SECRET",
      hint: "Hidden information",
      difficulty: 2,
      timeLimit: 25,
    },
    {
      scrambled: "DOCE",
      answer: "CODE",
      hint: "What you're trying to crack",
      difficulty: 1,
      timeLimit: 12,
    },
    {
      scrambled: "RDGUA",
      answer: "GUARD",
      hint: "Security personnel",
      difficulty: 1,
      timeLimit: 15,
    },
    {
      scrambled: "LALRMA",
      answer: "ALARM",
      hint: "Security warning system",
      difficulty: 2,
      timeLimit: 20,
    },
    {
      scrambled: "KCAAL",
      answer: "HACK",
      hint: "Break into systems",
      difficulty: 1,
      timeLimit: 12,
    },
    {
      scrambled: "SRETLE",
      answer: "STEALTH",
      hint: "Moving unseen",
      difficulty: 3,
      timeLimit: 35,
    },
    {
      scrambled: "SEDGUISI",
      answer: "DISGUISE",
      hint: "False identity",
      difficulty: 3,
      timeLimit: 40,
    },
    {
      scrambled: "TRAGET",
      answer: "TARGET",
      hint: "Mission objective",
      difficulty: 2,
      timeLimit: 25,
    },
    {
      scrambled: "RTLEIN",
      answer: "INTEL",
      hint: "Gathered information",
      difficulty: 2,
      timeLimit: 20,
    },
  ],
};

// Helper function to get random challenge by type
function getRandomChallenge(type) {
  const challenges = CHALLENGES[type];
  return challenges[Math.floor(Math.random() * challenges.length)];
}

// Helper function to get challenge by type and difficulty
function getChallengeByDifficulty(type, difficulty) {
  const challenges = CHALLENGES[type];
  const filtered = challenges.filter(
    (challenge) =>
      challenge.difficulty === difficulty ||
      challenge.difficulty === difficulty.toString()
  );
  return filtered.length > 0
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : getRandomChallenge(type);
}
