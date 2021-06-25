const Pool = require("pg").Pool;
// Pool allows us to set configuration for db

const pool = new Pool({
  user: "postgres",
  password: "test123",
  database: "todo_database",
  port: 5432,
});

module.exports = pool;
