const board = document.getElementById("board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]; // Board state

// Create 9 cells dynamically
function createBoard() {
  gameState = ["", "", "", "", "", "", "", "", ""]; // Reset the board state
  board.innerHTML = ""; // Clear previous board if any
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell clicks
function handleCellClick(event) {
  const clickedCellIndex = event.target.dataset.index;
  
  // Ignore if the cell is already filled or game is over
  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  // Update the board state and cell content
  gameState[clickedCellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check for a winner or a tie
  if (checkWinner()) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell !== "")) {
    statusDisplay.textContent = "It's a tie!";
    gameActive = false;
  } else {
    // Change turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winning conditions
function checkWinner() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

// Reset the game
function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  statusDisplay.textContent = `Player X's turn`;
  createBoard();
}

// Event listener for reset button
resetButton.addEventListener("click", resetGame);

// Initialize the game
createBoard();
