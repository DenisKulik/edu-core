import { Response } from "express";
import {
  ErrorResponse,
  HttpStatuses,
  RequestBody,
  RequestBodyParams,
  RequestParams,
  RequestQuery,
} from "../../../types";
import { CoursesService } from "../services/courses.service";
import { ValidationError } from "express-validator";
import {
  CourseCreateDTO,
  CoursesQueryDTO,
  CourseUpdateDTO,
  CourseURIParamsDTO,
  CourseViewDTO,
} from "../dto";

export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  async getCourses(
    req: RequestQuery<CoursesQueryDTO>,
    res: Response<CourseViewDTO[]>,
  ) {
    const { title, sortBy, direction } = req.query;
    const foundCourses = await this.coursesService.findCourses(
      title,
      sortBy,
      direction,
    );
    res.json(foundCourses);
  }

  async getCourse(
    req: RequestParams<CourseURIParamsDTO>,
    res: Response<CourseViewDTO | ErrorResponse>,
  ) {
    const { id } = req.params;
    const foundCourse = await this.coursesService.findCourseById(id);

    if (!foundCourse) {
      res.status(HttpStatuses.NOT_FOUND).json({ message: "Course not found" });
      return;
    }

    res.status(HttpStatuses.OK).json(foundCourse);
  }

  async createCourse(
    req: RequestBody<CourseCreateDTO>,
    res: Response<CourseViewDTO | { errors: ValidationError[] }>,
  ) {
    const createdCourse = await this.coursesService.createCourse(req.body);
    res.status(HttpStatuses.CREATED).json(createdCourse);
  }

  async updateCourse(
    req: RequestBodyParams<CourseUpdateDTO, CourseURIParamsDTO>,
    res: Response<
      CourseViewDTO | { errors: ValidationError[] } | ErrorResponse
    >,
  ) {
    const { id } = req.params;
    const updatedCourse = await this.coursesService.updateCourse(id, req.body);

    if (!updatedCourse) {
      res.status(HttpStatuses.NOT_FOUND).json({ message: "Course not found" });
      return;
    }

    res.status(HttpStatuses.CREATED).json(updatedCourse);
  }

  async deleteCourse(
    req: RequestParams<CourseURIParamsDTO>,
    res: Response<ErrorResponse | undefined>,
  ) {
    const { id } = req.params;
    const isDeletedCourse = await this.coursesService.deleteCourse(id);

    if (!isDeletedCourse) {
      res.status(HttpStatuses.NOT_FOUND).json({ message: "Course not found" });
      return;
    }

    res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}
