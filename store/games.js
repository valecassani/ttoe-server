import {
    connection
} from './db'
export const saveGame = game => {
    return connection('games').insert(game);

}
export const checkGame = gameId => {
    return connection('games').where({
        id: gameId
    });
}

export const resetGame = gameId => {
    return connection('moves').delete({
        gameId
    })
}