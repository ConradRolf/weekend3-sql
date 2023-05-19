const pg = require('pg'); 

const pool = new pg.Pool({
    // name of our database (changes every app):
        database: 'to-do-list',
    // where our database is (always localhost):
        host: 'localhost', 
    // Postgres listens on 5432 by default:
        port: 5432
    });

module.exports = pool;