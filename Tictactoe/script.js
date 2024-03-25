document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const gameBoard = document.getElementById('game-board');
    const cells = Array.from({ length: 9 }, (_, index) => createCell(index));
    const turnDisplay = document.getElementById('turn');
    const winnerScreen = document.getElementById('winner-screen');
    const winnerMessage = document.getElementById('winner-message');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');

    let currentPlayer = 'X';
    let gameActive = false;

    // Start button click event listener
    startBtn.addEventListener('click', startGame);

    // Initialize game board
    cells.forEach(cell => gameBoard.appendChild(cell));

    // Cell click event listener
    cells.forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));

    // Restart button click event listener
    restartBtn.addEventListener('click', restartGame);

    // Function to create a game cell
    function createCell(index) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        return cell;
    }

    // Function to handle cell click
    function handleCellClick(cell) {
        if (gameActive && !cell.textContent) {
            cell.textContent = currentPlayer;
            checkWin();
            switchPlayer();
        }
    }

    // Function to switch players
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `Current Turn: ${currentPlayer}`;
    }

    // Function to check for a winner
    function checkWin() {
        // Implement your winning logic here
        // For simplicity, a basic win check is provided
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                declareWinner(cells[a].textContent);
                return;
            }
        }

        if (!cells.some(cell => !cell.textContent)) {
            // If all cells are filled and no winner, it's a draw
            declareWinner('Draw');
        }
    }

    // Function to declare the winner
    function declareWinner(winner) {
        gameActive = false;

        if (winner === 'Draw') {
            winnerMessage.textContent = 'It\'s a Tie! 😐';
        } else {
            const winnerName = winner === 'X' ? playerXInput.value : playerOInput.value;
            winnerMessage.textContent = `🏅${winnerName} is the Winner!🎉`;
        }

        winnerScreen.style.display = 'block';
    }

    // Function to restart the game
    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        turnDisplay.textContent = `Current Turn: ${currentPlayer}`;
        winnerScreen.style.display = 'none';

        // Clear the cells
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Function to start the game
    function startGame() {
        const playerXName = playerXInput.value;
        const playerOName = playerOInput.value;

        if (playerXName && playerOName) {
            startScreen.style.display = 'none';
            gameContainer.style.display = 'flex';
            gameActive = true;
            turnDisplay.textContent = `Current Turn: ${currentPlayer}`;
        } else {
            alert('Please enter names for both players.');
        }
    }


    
});
