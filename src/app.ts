import express, { Express } from "express";
import { getLogsRouter, getTestsRouter } from "./routes";
import {
  loggerMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares";
import { registerEvents } from "./events";
import { UsersService } from "./domain";
import { JwtService } from "./application";
import { AuthController, getAuthRouter } from "./modules/auth";
import {
  CoursesController,
  CoursesService,
  getCoursesRouter,
} from "./modules/courses";

const app: Express = express();

export const jsonBodyMiddleware = express.json();

app.use(loggerMiddleware);
app.use(jsonBodyMiddleware);

const usersService = new UsersService();
const jwtService = new JwtService();
const coursesService = new CoursesService();

const authController = new AuthController(usersService, jwtService);
const coursesController = new CoursesController(coursesService);

const testsRouter = getTestsRouter();
const authRouter = getAuthRouter(authController);
const coursesRouter = getCoursesRouter(coursesController);
const logsRouter = getLogsRouter();

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
app.use("/logs", logsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

registerEvents();

export default app;
