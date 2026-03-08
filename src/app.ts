import express, { Express } from "express";
import { getAuthRouter, getCoursesRouter, getTestsRouter } from "./routes";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import { errorMiddleware } from "./middlewares/error-middleware";

const app: Express = express();

export const jsonBodyMiddleware = express.json();

app.use(loggerMiddleware);
app.use(jsonBodyMiddleware);

const coursesRouter = getCoursesRouter();
const testsRouter = getTestsRouter();
const authRouter = getAuthRouter();

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
