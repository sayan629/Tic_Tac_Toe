# 🎮 Tic Tac Toe — Arcade Edition

> A neon arcade-themed Tic Tac Toe game with 2-player & unbeatable CPU (Minimax AI) modes — built with HTML, CSS & JavaScript.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- 🕹️ **2-Player Mode** — Play against a friend locally
- 🤖 **VS CPU Mode** — Unbeatable AI powered by the Minimax algorithm
- 🌟 **Neon Arcade UI** — Glowing symbols, CRT scanlines & animated grid
- 🏆 **Score Tracker** — Persistent X / O / Draw scores across rounds
- 💥 **Win Line Animation** — SVG line drawn across the winning combo
- 📱 **Fully Responsive** — Works on desktop, tablet & mobile

---

## 📁 Project Structure

```
tic-tac-toe-arcade/
├── index.html       # Game structure & layout
├── style.css        # Neon arcade styles & animations
├── script.js        # Game logic & Minimax AI
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

### Play Instantly
Just open `index.html` in any modern browser — no install or setup needed.

### Clone the Repo
```bash
git clone https://github.com/yourusername/tic-tac-toe-arcade.git
cd tic-tac-toe-arcade
open index.html
```

---

## 🎯 How to Play

1. **Choose a mode** — `2 PLAYERS` or `VS CPU` at the bottom
2. **Player X always goes first**
3. **Click any cell** to place your mark
4. **First to get 3 in a row** (horizontal, vertical, or diagonal) wins
5. Hit **↺ NEW GAME** to restart or **⊘ RESET SCORE** to clear scores

---

## 🤖 How the AI Works

The CPU uses the **Minimax algorithm** — it explores every possible future move and picks the optimal one. This means:
- It will **never lose** — best you can do is a draw
- It **blocks your winning moves** instantly
- It always takes a **winning move** if available

---

## 🛠️ Built With

| Technology | Purpose |
|------------|---------|
| HTML5 | Game board structure & modal |
| CSS3 | Neon theme, animations, responsive layout |
| JavaScript (Vanilla) | Game logic, AI, score tracking |
| Google Fonts — Orbitron | Arcade display font |
| SVG | Animated win line overlay |

---

## 📸 Preview

```
  ✕  |     |  ○
─────────────────
     |  ✕  |
─────────────────
  ○  |     |  ✕  ← PLAYER X WINS!
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ Sayan and lots of neon</p>
