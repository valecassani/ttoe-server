import { connection } from './db';
export const saveGame = async ({ players, dimension }) => {
    const [gameId] = await connection('games').insert({ maxUsers: players, dimension: dimension, currentPlayer: 0 });
    return getGame(gameId);
};
export const checkGame = gameId => {
    return connection('games')
        .where({
            id: gameId
        })
        .first()
        .select('id', 'maxUsers', 'winner');
};

export const getGame = async gameId => {
    const moves = await getMovesFromGame(gameId);
    const movesStr = await JSON.stringify(moves);
    const movesJson = await JSON.parse(movesStr);
    const game = await connection('games')
        .where({
            id: gameId
        })
        .first()
        .select('id', 'maxUsers', 'winner', 'currentPlayer', 'dimension');

    return {
        ...game,
        moves: movesJson
    };
};

export const resetGame = async gameId => {
    await connection('moves')
        .where({ gameId })
        .del();
    await connection('games')
        .where({ id: gameId })
        .update({ currentPlayer: 0, winner: null });
    return await getGame(gameId);
};

const checkWinner = game => {
    const filteredMoves = game.moves.filter(moves => moves.user === game.currentPlayer);
    const xPositions = filteredMoves.map(move => move.xPos);
    if (filteredMoves.filter(move => xPositions.indexOf(move.xPos) !== -1).length === game.dimension) {
        return true;
    }
    const yPositions = filteredMoves.map(move => move.yPos);
    if (filteredMoves.filter(move => yPositions.indexOf(move.yPos) !== -1).length === game.dimension) {
        return true;
    }

    // I HAVE TO CHECK THE DIAGONALS AND ANTIDIAGONALS
    return false;
};

export const addMove = async move => {
    await connection('moves').insert(move);
    let game = await getGame(move.gameId);
    const { currentPlayer, maxUsers } = game;
    let newCurrentPlayer;
    if (checkWinner(game)) {
        await connection('games')
            .where({ id: move.gameId })
            .update({ winner: currentPlayer });
        game = await getGame(move.gameId);
    } else {
        newCurrentPlayer = (currentPlayer + 1) % maxUsers;
        await connection('games')
            .where({ id: move.gameId })
            .update({ currentPlayer: newCurrentPlayer });
    }
    return { ...game, currentPlayer: newCurrentPlayer };
};

export const getMovesFromGame = async gameId => {
    return await connection('moves')
        .where({
            gameId
        })
        .select('xPos', 'yPos', 'user');
};
