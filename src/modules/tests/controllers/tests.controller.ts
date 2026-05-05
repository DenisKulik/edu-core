import { Request, Response } from "express";
import { TestsService } from "../services/tests.service";
import { HttpStatuses } from "../../../types";

export class TestsController {
  constructor(private testsService: TestsService) {}

  async deleteAllCourses(req: Request, res: Response) {
    this.testsService.clearCoursesDb();
    res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}
