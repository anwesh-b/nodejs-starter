import express from "express";
import bodyParser from "body-parser";

import config from "./config";
import routes from "./routes";

import { errorHandler } from "./middleware/errorHandler";

const port = config.port;

const app = express();

app.use(bodyParser.json());

app.use(config.baseURL, routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException");
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection");
  console.log(err);
});
