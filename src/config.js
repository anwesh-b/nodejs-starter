import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.APP_PORT || 3000,
  baseURL: `/${process.env.APP_BASE_URL || "api"}`,
};

export default config;
