import express from "express";
import bodyParser from "body-parser";

import config from "./config";
import routes from "./routes";

const port = config.port;

const app = express();

app.use(bodyParser.json());

app.use(config.baseURL, routes);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
