// ================================
//  TIC TAC TOE — ARCADE EDITION
//  script.js
// ================================

const WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8],   // rows
  [0,3,6], [1,4,7], [2,5,8],   // cols
  [0,4,8], [2,4,6]             // diagonals
];

// Win-line coordinates [x1%, y1%, x2%, y2%] inside the 300x300 viewBox
const WIN_LINE_COORDS = {
  '0,1,2': [0,50,300,50],
  '3,4,5': [0,150,300,150],
  '6,7,8': [0,250,300,250],
  '0,3,6': [50,0,50,300],
  '1,4,7': [150,0,150,300],
  '2,5,8': [250,0,250,300],
  '0,4,8': [10,10,290,290],
  '2,4,6': [290,10,10,290]
};

// ---- State ----
let board        = Array(9).fill('');
let currentPlayer = 'X';
let gameActive   = true;
let vsComputer   = false;
let scores       = { X: 0, O: 0, D: 0 };

// ---- DOM ----
const cells         = document.querySelectorAll('.cell');
const statusText    = document.getElementById('status-text');
const statusInd     = document.querySelector('.status-indicator');
const xScore        = document.getElementById('x-score');
const oScore        = document.getElementById('o-score');
const drawScore     = document.getElementById('draw-score');
const scoreCardX    = document.getElementById('score-x');
const scoreCardO    = document.getElementById('score-o');
const winLineSvg    = document.getElementById('win-line-svg');
const winLine       = document.getElementById('win-line');
const modalOverlay  = document.getElementById('modal-overlay');
const modalSymbol   = document.getElementById('modal-symbol');
const modalTitle    = document.getElementById('modal-title');
const restartBtn    = document.getElementById('restart-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');
const modalPlayAgain= document.getElementById('modal-play-again');
const pvpBtn        = document.getElementById('pvp-btn');
const pvcBtn        = document.getElementById('pvc-btn');

// ---- Init ----
cells.forEach(cell => cell.addEventListener('click', onCellClick));
restartBtn.addEventListener('click', restartGame);
resetScoreBtn.addEventListener('click', resetScores);
modalPlayAgain.addEventListener('click', () => { hideModal(); restartGame(); });
pvpBtn.addEventListener('click', () => setMode(false));
pvcBtn.addEventListener('click', () => setMode(true));

updateScoreDisplay();
updateStatus();
updateActiveScoreCard();

// ---- Mode ----
function setMode(cpu) {
  vsComputer = cpu;
  pvpBtn.classList.toggle('active', !cpu);
  pvcBtn.classList.toggle('active', cpu);
  restartGame();
}

// ---- Click Handler ----
function onCellClick(e) {
  const idx = parseInt(e.target.dataset.index);
  if (!gameActive || board[idx]) return;
  makeMove(idx, currentPlayer);
}

function makeMove(idx, player) {
  board[idx] = player;
  renderCell(idx, player);
  const result = checkResult();
  if (result) return;
  switchPlayer();
  if (vsComputer && currentPlayer === 'O' && gameActive) {
    setTimeout(cpuMove, 420);
  }
}

// ---- Render ----
function renderCell(idx, player) {
  const cell = cells[idx];
  cell.textContent = player === 'X' ? '✕' : '○';
  cell.classList.add(player === 'X' ? 'x-cell' : 'o-cell', 'taken');
}

// ---- Switch Player ----
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
  updateActiveScoreCard();
}

// ---- Status ----
function updateStatus(msg) {
  if (msg) {
    statusText.textContent = msg;
  } else {
    const who = vsComputer && currentPlayer === 'O' ? 'CPU' : `PLAYER ${currentPlayer}`;
    statusText.textContent = `${who} — YOUR MOVE`;
  }
}

function updateActiveScoreCard() {
  scoreCardX.classList.toggle('active-x', currentPlayer === 'X');
  scoreCardO.classList.toggle('active-o', currentPlayer === 'O');
  statusInd.style.background = currentPlayer === 'X'
    ? 'var(--x-color)' : 'var(--o-color)';
  statusInd.style.boxShadow = currentPlayer === 'X'
    ? '0 0 8px var(--x-color)' : '0 0 8px var(--o-color)';
}

// ---- Check Result ----
function checkResult() {
  for (const combo of WIN_COMBOS) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      handleWin(board[a], combo);
      return true;
    }
  }
  if (board.every(v => v)) {
    handleDraw();
    return true;
  }
  return false;
}

// ---- Win ----
function handleWin(player, combo) {
  gameActive = false;
  combo.forEach(idx => cells[idx].classList.add('winning'));
  drawWinLine(combo);
  scores[player]++;
  updateScoreDisplay();
  animateScorePop(player);

  const playerLabel = vsComputer && player === 'O' ? 'CPU' : `PLAYER ${player}`;
  updateStatus(`${playerLabel} WINS!`);

  setTimeout(() => {
    modalSymbol.textContent = player === 'X' ? '✕' : '○';
    modalSymbol.className = 'modal-symbol ' + (player === 'X' ? 'x-win' : 'o-win');
    modalTitle.textContent = `${playerLabel} WINS!`;
    showModal();
  }, 900);
}

// ---- Draw ----
function handleDraw() {
  gameActive = false;
  scores.D++;
  updateScoreDisplay();
  animateScorePop('D');
  updateStatus('DRAW — NO WINNER');

  setTimeout(() => {
    modalSymbol.textContent = '⊘';
    modalSymbol.className = 'modal-symbol draw';
    modalTitle.textContent = "IT'S A DRAW!";
    showModal();
  }, 600);
}

// ---- Win Line Animation ----
function drawWinLine(combo) {
  const key  = combo.join(',');
  const coords = WIN_LINE_COORDS[key];
  if (!coords) return;
  const [x1,y1,x2,y2] = coords;
  winLine.setAttribute('x1', x1);
  winLine.setAttribute('y1', y1);
  winLine.setAttribute('x2', x2);
  winLine.setAttribute('y2', y2);
  winLineSvg.style.display = 'block';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => winLine.classList.add('draw-line'));
  });
}

function clearWinLine() {
  winLine.classList.remove('draw-line');
  winLine.setAttribute('x1', 0); winLine.setAttribute('y1', 0);
  winLine.setAttribute('x2', 0); winLine.setAttribute('y2', 0);
}

// ---- Score ----
function updateScoreDisplay() {
  xScore.textContent    = scores.X;
  oScore.textContent    = scores.O;
  drawScore.textContent = scores.D;
}

function animateScorePop(player) {
  const el = player === 'X' ? xScore : player === 'O' ? oScore : drawScore;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

// ---- Restart ----
function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
  clearWinLine();
  updateStatus();
  updateActiveScoreCard();
}

function resetScores() {
  scores = { X: 0, O: 0, D: 0 };
  updateScoreDisplay();
  restartGame();
}

// ---- Modal ----
function showModal() { modalOverlay.classList.add('show'); }
function hideModal() { modalOverlay.classList.remove('show'); }
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) hideModal(); });

// ---- CPU (Minimax) ----
function cpuMove() {
  if (!gameActive) return;
  const idx = bestMove();
  makeMove(idx, 'O');
}

function bestMove() {
  // Try to win
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      if (checkWinner(board) === 'O') { board[i] = ''; return i; }
      board[i] = '';
    }
  }
  // Block X
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'X';
      if (checkWinner(board) === 'X') { board[i] = ''; return i; }
      board[i] = '';
    }
  }
  // Center
  if (!board[4]) return 4;
  // Minimax fallback
  let best = -Infinity, move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = '';
      if (score > best) { best = score; move = i; }
    }
  }
  return move;
}

function minimax(b, depth, isMax) {
  const w = checkWinner(b);
  if (w === 'O') return 10 - depth;
  if (w === 'X') return depth - 10;
  if (b.every(v => v)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = 'O';
        best = Math.max(best, minimax(b, depth+1, false));
        b[i] = '';
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = 'X';
        best = Math.min(best, minimax(b, depth+1, true));
        b[i] = '';
      }
    }
    return best;
  }
}

function checkWinner(b) {
  for (const [a,bI,c] of WIN_COMBOS) {
    if (b[a] && b[a] === b[bI] && b[a] === b[c]) return b[a];
  }
  return null;
}
