// Factory function for the Player objects

const Player = (name, sign) => {
    return {name, sign};
}

// Module for the gameBoard

const gameBoard = (function() {
    let board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];

    function setField(sign, index) {
        if (index < board.length) {
            board[index] = sign;
        }
    }

    function isValidMove(index) {
        return (index < board.length && board[index] == "")
    }

    function reset() {
        for (let i in board) {
            board[i] = "";
        }
    }

    return {setField, isValidMove, reset};
})();

// Module for the displayController

const displayController = (function() {

    // Cache #game-board container div and the inner field divs for rendering fields from board Array

    const fieldDivs = document.querySelectorAll(".field");

    function renderGameboard() {
        for (i in fieldDivs) {
            fieldDivs[i].innerHTML = board[i];
        }
    }

    return {renderGameboard};
})();


// Module for the gameController

const gameController = (function() {
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    let round = 1;

    function playRound(index) {
        if (gameBoard.isValidMove(index)) {
            currentPlayer = round % 2 == 1 ? playerOne : playerTwo;
            gameBoard.setField(currentPlayer.sign, index);
            
            // Check if this was the winning move
            if (checkWinner()) {
                // Display winner's info
                return;
            }
            // Check if the current round is the last (9th) round
            if (round == 9) {
                // Display "Draw" info
                return;
            }
            // If the game isn't over, increment "round"
            round ++;
        }
        
        
    }

    return {playRound}

})();







