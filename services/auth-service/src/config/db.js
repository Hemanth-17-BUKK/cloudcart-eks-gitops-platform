const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectWithRetry = async () => {
  while (true) {
    try {
      await pool.query("SELECT 1");
      console.log("PostgreSQL connected successfully");
      break;
    } catch (error) {
      console.log("Waiting for PostgreSQL...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

connectWithRetry();

module.exports = pool;