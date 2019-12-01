import {
    connection
} from './db'

const setup = async () => {
    // await connection.raw('DROP DATABASE tictactoe')
    await connection.raw('CREATE DATABASE IF NOT EXISTS tictactoe')

    if (!await connection.schema.withSchema('tictactoe').hasTable('games')) {
        await connection.schema.withSchema('tictactoe').createTable('games', table => {
            table.increments('id')
            table.integer('maxUsers')
            table.integer('dimension')
            table.integer('currentPlayer')
            table.integer('winner')
        })

    }

    if (!await connection.schema.withSchema('tictactoe').hasTable('moves')) {
        await connection.schema.withSchema('tictactoe').createTable('moves', table => {
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