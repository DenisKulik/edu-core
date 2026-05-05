import express, { Express } from "express";
import {
  getTestsRouter,
  TestsController,
  TestsRepository,
  TestsService,
} from "./modules/tests";
import {
  loggerMiddleware,
  notFoundMiddleware,
  errorMiddleware,
} from "./middlewares";
import { registerEvents } from "./events";
import { UsersRepository, UsersService } from "./modules/users";
import { JwtService } from "./modules/auth";
import { AuthController, getAuthRouter } from "./modules/auth";
import {
  CoursesController,
  CoursesRepository,
  CoursesService,
  getCoursesRouter,
} from "./modules/courses";
import {
  getLogsRouter,
  LogsController,
  LogsService,
} from "./modules/admin/logs";

const app: Express = express();

export const jsonBodyMiddleware = express.json();

app.use(loggerMiddleware);
app.use(jsonBodyMiddleware);

const coursesRepository = new CoursesRepository();
const usersRepository = new UsersRepository();
const testsRepository = new TestsRepository();

const usersService = new UsersService(usersRepository);
const jwtService = new JwtService();
const coursesService = new CoursesService(coursesRepository);
const testsService = new TestsService(testsRepository);
const logsService = new LogsService();

const authController = new AuthController(usersService, jwtService);
const coursesController = new CoursesController(coursesService);
const testsController = new TestsController(testsService);
const logsController = new LogsController(logsService);

const authRouter = getAuthRouter(authController);
const coursesRouter = getCoursesRouter(coursesController);
const testsRouter = getTestsRouter(testsController);
const logsRouter = getLogsRouter(logsController);

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/__test__", testsRouter);
app.use("/logs", logsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

registerEvents();

export default app;
