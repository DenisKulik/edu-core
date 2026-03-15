import express, { Express } from "express";
import { getCoursesRouter, getLogsRouter, getTestsRouter } from "./routes";
import {
  loggerMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares";
import { registerEvents } from "./events";
import { UsersService } from "./domain";
import { JwtService } from "./application";
import { AuthController, getAuthRouter } from "./modules/auth";

const app: Express = express();

export const jsonBodyMiddleware = express.json();

app.use(loggerMiddleware);
app.use(jsonBodyMiddleware);

const usersService = new UsersService();
const jwtService = new JwtService();

const authController = new AuthController(usersService, jwtService);

const coursesRouter = getCoursesRouter();
const testsRouter = getTestsRouter();
const authRouter = getAuthRouter(authController);
const logsRouter = getLogsRouter();

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
app.use("/logs", logsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

registerEvents();

export default app;
