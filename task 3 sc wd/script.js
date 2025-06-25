const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.getElementById('winning-message');
const restartButton = document.getElementById('restartBtn');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let isCircleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageText.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, currentClass);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass === 'x' ? '❌' : '⭕';
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw, winner = '') {
  if (draw) {
    winningMessageText.innerText = `😐 It's a Draw! Play Again?`;
    drawSound.play();
  } else {
    winningMessageText.innerText = `🎉 ${winner === 'x' ? '❌' : '⭕'} Wins the Game!`;
    winSound.play();
  }
  winningMessageText.classList.remove('hide');
}
