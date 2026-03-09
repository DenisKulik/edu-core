import express, { Express } from "express";
import {
  getAuthRouter,
  getCoursesRouter,
  getLogsRouter,
  getTestsRouter,
} from "./routes";
import {
  loggerMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares";
import {} from "./routes/logs-router";

const app: Express = express();

export const jsonBodyMiddleware = express.json();

app.use(loggerMiddleware);
app.use(jsonBodyMiddleware);

const coursesRouter = getCoursesRouter();
const testsRouter = getTestsRouter();
const authRouter = getAuthRouter();
const logsRouter = getLogsRouter();

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
app.use("/logs", logsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
