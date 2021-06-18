const Pool = require('pg').Pool;

const pool = new Pool( {
    user: "postgres",
    password: "BshG1941?",
    host: "localhost",
    port: 5432,
    database: "app"
});

module.exports = pool;