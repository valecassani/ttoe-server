import {
    connection
} from './db'
export const saveGame = async game => {
    const [gameId] = await connection('games').insert(game);
    return getGame(gameId)
}
export const checkGame = gameId => {
    return connection('games').where({
        id: gameId
    });
}

export const getGame = async gameId => {
    const moves = await getMovesFromGame(gameId)
    const game = await connection('games').where({
        id: gameId
    }).first().select('id', 'maxUsers', 'winner', 'currentPlayer', 'dimension')

    return {
        ...game,
        moves
    }
}

export const resetGame = async gameId => {
    return await connection('moves').where({
        gameId
    }).del()
}
export const addMove = async move => {
    return await connection('moves').insert(move)
}

export const getMovesFromGame = async gameId => {
    return await connection('moves').where({
        gameId
    }).select('xPos', 'yPos', 'user')
}