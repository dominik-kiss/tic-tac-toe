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

    // Cache the field divs for rendering fields from board Array
    // Cache the message board's divs containing the player names

    const fieldDivs = document.querySelectorAll(".field");
    const playerNames = document.querySelectorAll(".player-name");

    function renderGameboard() {
        // Update the "field" div elements to the corresponding value from the board array
        for (i in fieldDivs) {
            fieldDivs[i].innerHTML = gameBoard.getField(i);
        }
        // If it's not a "reset", switch the highlight of the player's name to show who's turn it is
        if(gameController.getRound() != 1) {
            playerNames.forEach(playerName => playerName.classList.toggle("current"));
        }
        else {
            playerNames.forEach(playerName => playerName.classList.remove("current"));
            playerNames[0].classList.add("current");
        }

    }


    fieldDivs.forEach(button => button.addEventListener("click", function() {
        if (this.classList.contains("hovered")) {
            this.classList.remove("hovered");
        }
        gameController.playRound(parseInt(this.dataset.index));
        if(!gameController.isGameOver()) {
            renderGameboard();
        }
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

    // Cache message box and define function to announce winner and other messages

    const messageDisplay = document.querySelector("#message");

    function updateMessage(type) {
        if(type == "draw") {
            messageDisplay.innerHTML = "It's a tie!";
            return;
        }
        if(type == "reset") {
            messageDisplay.innerHTML = "";
            return;
        }
        messageDisplay.innerHTML = `${gameController.getCurrentPlayer().name} wins!`;
    }

    // Cache reset button and add event listener

    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", reset);

    function reset() {
        gameBoard.resetBoard();
        gameController.reset();
        renderGameboard();
        updateMessage("reset");
    }

    return {renderGameboard, updateMessage};
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
                gameOver = true;
                displayController.updateMessage(currentPlayer.name);
                return;
            }
            // Check if the current round is the last (9th) round
            if (round == 9) {
                displayController.updateMessage("draw");
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

    function getRound() {
        return round;
    }

    function reset() {
        round = 1;
        gameOver = false;
    }

    return {playRound, checkWinner, getCurrentPlayer, isGameOver, getRound, reset}

})();







