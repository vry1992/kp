import knex from 'knex';

export const pool = knex({
    client: 'pg',
    connection: {
        user: 'postgres',
        host: '127.0.0.1',
        database: 'dubaev',
        password: 'user',
        port: 5432,
    }
})