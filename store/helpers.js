export const checkWinner = (game, lastMove) => {
    const filteredMoves = game.moves.filter(moves => moves.user === game.currentPlayer);
    let newArr = Array(game.dimension)
        .fill(0)
        .map(x => Array(game.dimension).fill(0));
    filteredMoves.forEach(currentItem => {
        newArr[currentItem.xPos][currentItem.yPos] = 1;
    });
    const n = game.dimension;
    // Check the column
    for (let i = 0; i < n; i++) {
        if (newArr[i][lastMove.yPos] !== 1) break;
        if (i === n - 1) {
            return true;
        }
    }

    // Check the row
    for (let i = 0; i < n; i++) {
        if (newArr[lastMove.xPos][i] !== 1) break;
        if (i === n - 1) {
            return true;
        }
    }

    // Check the diagonal
    for (let i = 0; i < n; i++) {
        if (newArr[i][i] !== 1) break;
        if (i === n - 1) {
            return true;
        }
    }

    // Check the antidiagonal
    for (let i = 0; i < n; i++) {
        if (newArr[i][n - 1 - i] !== 1) break;
        if (i === n - 1) {
            return true;
        }
    }

    return false;
};
