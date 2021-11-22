import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./db/connect";
import log from "./logger";
import setupRoutes from "./routes";
import dotenv from "dotenv";
import swaggerUI, { SwaggerOptions } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import "express-async-errors";
import { swaggerOptions } from "./config";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT);

const specs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
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
 
