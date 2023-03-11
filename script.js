// Module for the gameBoard

const gameBoard = (function() {
    let board = ["X", "O", "X", "X", "O", "X", "O", "O"];
})();

// Module for the displayController

const displayController = (function() {
    
})();

// Factory function for the Player objects

const Player = (name, sign) => {
    return {name, sign};
}