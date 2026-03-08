import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./repositories";

const port = process.env.PORT;

const startApp = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startApp();
