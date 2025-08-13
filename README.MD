# Cipher Strike 🎯🔐

## 📜 Project Description

The objective of the fast-paced puzzle game with an espionage theme, **Cipher Strike**, is to solve a 3-digit code by solving a series of randomly generated mini-challenges. Failures result in death, while successful challenges expose one code digit.

The challenges come in a tight, mission-style setting and include anything from fast math tasks and memory tests to reflex and logic puzzles. Players must reveal all three digits and enter the correct code to win before the allotted lives, or, in hardcore mode, before the time runs out.

---

## 🎮 Core Gameplay

1. **Game Initialization**

   - Randomly generate a 3-digit target code.
   - Set initial lives to `3`.
   - Display spy-themed UI with mission briefing.

2. **Main Game Loop**

   - Present a random mini-challenge.
   - Player attempts the challenge within a time limit.
   - On success:
     - Reveal one code digit.
     - Award score based on speed and accuracy.
   - On failure:
     - Lose a life.
   - Repeat until:
     - All digits are revealed (**Win**).
     - Lives reach zero (**Loss**).

3. **Win Condition**

   - Successfully complete 3 challenges to reveal the full code.
   - Enter the code to "break in."

4. **Loss Condition**
   - Lives reach 0.
   - (Optional) Time limit exceeded in Hardcore Mode.

---

## 🕹️ Example Mini-Challenges

- **Math Speed Challenge** → Solve arithmetic problems quickly.
- **Pattern Memory** → Memorize and repeat color sequences.
- **Reflex Test** → Click targets before they disappear.
- **Logic Puzzle** → Complete number/color patterns.
- **Word Scramble** → Unscramble spy-related words.

---

## Future Improvements

To Be Added

## MockUp

To Be Added ( will be created in Figma)
