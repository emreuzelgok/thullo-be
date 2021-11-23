import { connect } from "mongoose";
import log from "../utils/logger";

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    log.info(`Connected Database: ${process.env.MONGODB_URI}`);
  } catch (error) {
    log.error(`Database connectioin error: ${error}`);
    process.exit(1);
  }
}

export default connectDB;