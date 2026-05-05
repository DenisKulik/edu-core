import { Router } from "express";
import { CoursesController } from "./controllers/courses.controller";
import { courseValidator } from "../../utils";
import { authMiddleware, inputValidationMiddleware } from "../../middlewares";

export const getCoursesRouter = (controller: CoursesController) => {
  const router = Router();

  router.get("/", controller.getCourses.bind(controller));

  router.get("/:id", controller.getCourse.bind(controller));

  router.post(
    "/",
    courseValidator,
    inputValidationMiddleware,
    authMiddleware,
    controller.createCourse.bind(controller),
  );

  router.put(
    "/:id",
    courseValidator,
    inputValidationMiddleware,
    controller.updateCourse.bind(controller),
  );

  router.delete("/:id", controller.deleteCourse.bind(controller));

  return router;
};
