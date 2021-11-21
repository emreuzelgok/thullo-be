import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./db/connect";
import log from "./logger";
import setupRoutes from "./routes";

require('express-async-errors');
require('dotenv').config();

const app: Application = express();
const port: number = parseInt(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(cors({ origin: [`http://localhost:${port}`] }));

app.get('/', (_req, res) => {
  res.send('Thullo API 1.0');
});

app.listen(port, () => {
  log.info(`server is listening on ${port}`);
  connectDB();
  setupRoutes(app);
});
 
