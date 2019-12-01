import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL || {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'tictactoe'
    }
});

export {
    connection
}