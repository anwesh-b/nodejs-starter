import dotenv from "dotenv";

dotenv.config({path: __dirname+"/../.env"});

const connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8",
  timezone: "UTC",
};

export default {
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: "migrations_starter", // Change to your table name for storing migrations.
    directory: "./migrations",
    stub: "./stub/migrations.stub",
  },
  seeds: {
    directory: "./seed",
    stub: "./stub/seeds.stub",
  },
};
