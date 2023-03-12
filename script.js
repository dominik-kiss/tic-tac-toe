// Factory function for the Player objects

const Player = (name, sign) => {
    return {name, sign};
}

// Module for the gameBoard

const gameBoard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    function setField(sign, index) {
        if (index < board.length) {
            board[index] = sign;
        }
    }

    function getField(index) {
        return board[index];
    }

    function isValidMove(index) {
        return (index < board.length && board[index] == "")
    }

    function resetBoard() {
        for (let i in board) {
            board[i] = "";
        }
    }

    return {setField, getField, isValidMove, resetBoard};
})();

// Module for the displayController

const displayController = (function() {

    // Cache #game-board container div and the inner field divs for rendering fields from board Array

    const fieldDivs = document.querySelectorAll(".field");

    function renderGameboard() {
        for (i in fieldDivs) {
            fieldDivs[i].innerHTML = gameBoard.getField(i);
        }
    }

    fieldDivs.forEach(button => button.addEventListener("click", function() {
        if (this.classList.contains("hovered")) {
            this.classList.remove("hovered");
        }
        gameController.playRound(parseInt(this.dataset.index));
        renderGameboard();
    }));

    // Event listeners for hovering over fields, to show the player what they are about to do
    
    fieldDivs.forEach(field => field.addEventListener("mouseenter", transition));
    fieldDivs.forEach(field => field.addEventListener("mouseleave", transition));
    
    // Change the hovered field's color and add a low opacity version of the current player's sign
    function transition(e) {
        if (gameController.isGameOver()) {
            return;
        }
        if (this.innerHTML == "") {
            this.classList.toggle("hovered");
            this.innerHTML = gameController.getCurrentPlayer().sign;
            return;
        }
        if (this.innerHTML != "" && this.classList.contains("hovered")) {
            this.classList.toggle("hovered");
            this.innerHTML = "";
            return;
        }
    }

    return {renderGameboard};
})();


// Module for the gameController

const gameController = (function() {
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");

    let round = 1;
    let gameOver = false;

    function playRound(index) {
        if (gameBoard.isValidMove(index) && !gameOver) {
            currentPlayer = getCurrentPlayer();
            gameBoard.setField(currentPlayer.sign, index);
            
            // Check if this was the winning move
            if (checkWinner(currentPlayer.sign)) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }
            // Check if the current round is the last (9th) round
            if (round == 9) {
                console.log("Draw");
                gameOver = true;
                return;
            }
            // If the game isn't over, increment "round"
            round ++;
        }
        
    }

    const winOptions = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6]
    ]

    function checkWinner(sign) {
        return winOptions.filter(option => option.every((value) => gameBoard.getField(value) == sign)).length > 0;
    }

    function getCurrentPlayer() {
        return round % 2 == 1 ? playerOne : playerTwo;
    }

    function isGameOver() {
        return gameOver;
    }

    function reset() {
        round = 1;
        gameOver = false;
    }

    return {playRound, checkWinner, getCurrentPlayer, isGameOver, reset}

})();







