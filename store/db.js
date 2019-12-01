import mysql from 'mysql';

import knex from 'knex';
import setup from './setup';

const connection = knex({
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL ? `${process.env.CLEARDB_DATABASE_URL}/tictactoe` : {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'tictactoe'
    }
});

export {
    connection
}