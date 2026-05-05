import { nanoid } from "nanoid";

import { Course } from "../domain/courses.entity";
import { CourseCreateDTO, CourseUpdateDTO, CourseViewDTO } from "../dto";
import { ICoursesRepository } from "../repositories/courses.repository.interface";
import { ICoursesService } from "./courses.service.interface";

export class CoursesService implements ICoursesService {
  constructor(private readonly repository: ICoursesRepository) {}

  async findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]> {
    const courses = await this.repository.findAll(title, sortBy, direction);
    return courses.map(this.toCourseViewDto);
  }

  async findCourseById(id: string): Promise<CourseViewDTO | null> {
    const course = await this.repository.findById(id);
    return course ? this.toCourseViewDto(course) : null;
  }

  async createCourse(courseDTO: CourseCreateDTO): Promise<CourseViewDTO> {
    const course: Course = {
      id: nanoid(),
      title: courseDTO.title,
      price: courseDTO.price,
      studentsCount: 0,
    };

    const createdCourse = await this.repository.create(course);
    return this.toCourseViewDto(createdCourse);
  }

  async updateCourse(
    id: string,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null> {
    const updatedCourse = await this.repository.update(id, course);
    return updatedCourse ? this.toCourseViewDto(updatedCourse) : null;
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  private toCourseViewDto(dbCourse: Course): CourseViewDTO {
    if (!dbCourse.id) {
      throw new Error(`Invalid document: missing id field`);
    }

    return {
      id: dbCourse.id,
      title: dbCourse.title,
      price: dbCourse.price,
    };
  }
}
