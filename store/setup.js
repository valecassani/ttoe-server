import {
    connection
} from './db'

const setup = async () => {
    // await connection.raw('DROP DATABASE tictactoe')

    if (!await connection.schema.hasTable('games')) {
        await connection.schema.createTable('games', table => {
            table.increments('id')
            table.integer('maxUsers')
            table.integer('dimension')
            table.integer('currentPlayer')
            table.integer('winner')
        })

    }

    if (!await connection.schema.hasTable('moves')) {
        await connection.schema.createTable('moves', table => {
            table.increments('id')
            table.integer('user')
            table.integer('xPos')
            table.integer('yPos')
            table.integer('gameId')
        })
    }

    return connection
}

export default setup