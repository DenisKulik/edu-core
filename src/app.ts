import express, { Express } from "express";
import { getAuthRouter, getCoursesRouter, getTestsRouter } from "./routes";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { requestDurationMiddleware } from "./middlewares/request-duration-middleware";

const app: Express = express();

export const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const coursesRouter = getCoursesRouter();
const testsRouter = getTestsRouter();
const authRouter = getAuthRouter();

app.use(loggerMiddleware);
app.use(requestDurationMiddleware);

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);

export default app;
