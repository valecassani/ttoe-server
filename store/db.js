import mysql from 'mysql';

import knex from 'knex';
import setup from './setup';

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