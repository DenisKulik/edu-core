import { toCourseViewDto } from "./courses.mapper";
import { Course } from "./courses.entity";
import { UpdateResult } from "mongodb";
import { SortOrder } from "mongoose";
import { CourseModel } from "../../db";
import { CourseUpdateDTO, CourseViewDTO } from "./courses.dto";

export interface ICoursesRepository {
  findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]>;
  findCourseById(id: number): Promise<CourseViewDTO | null>;
  createCourse(course: Omit<Course, "_id">): Promise<CourseViewDTO>;
  updateCourse(
    id: number,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null>;
  deleteCourse(id: number): Promise<boolean>;
}

export class CoursesRepository implements ICoursesRepository {
  async findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]> {
    const filter: any = {};
    const sort: Record<string, SortOrder> = {};

    if (title) {
      filter.title = title;
    }
    if (sortBy) {
      sort[sortBy] = direction === "asc" ? 1 : -1;
    }

    const courses = await CourseModel.find(filter).sort(sort).lean();
    return courses.map((dbCourse) => toCourseViewDto(dbCourse));
  }

  async findCourseById(id: number): Promise<CourseViewDTO | null> {
    const foundCourse: Course | null = await CourseModel.findOne({ id });
    return foundCourse ? toCourseViewDto(foundCourse) : null;
  }

  async createCourse(course: Omit<Course, "_id">): Promise<CourseViewDTO> {
    await CourseModel.create(course);
    const createdCourse: CourseViewDTO | null = await CourseModel.findOne({
      id: course.id,
    });
    return toCourseViewDto(createdCourse as Course);
  }

  async updateCourse(
    id: number,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null> {
    const result: UpdateResult<Course> = await CourseModel.updateOne(
      { id },
      { $set: course },
    );

    if (result.matchedCount === 0) {
      return null;
    }

    const updatedCourse: CourseViewDTO | null = await CourseModel.findOne({
      id,
    });

    return toCourseViewDto(updatedCourse as Course);
  }

  async deleteCourse(id: number): Promise<boolean> {
    const result = await CourseModel.deleteOne({ id });

    return result.deletedCount !== 0;
  }
}
