import { Course } from "./courses.entity";
import { CourseCreateDTO, CourseUpdateDTO, CourseViewDTO } from "./courses.dto";
import { CoursesRepository, ICoursesRepository } from "./courses.repository";

export interface ICoursesService {
  findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]>;
  findCourseById(id: number): Promise<CourseViewDTO | null>;
  createCourse(course: CourseCreateDTO): Promise<CourseViewDTO>;
  updateCourse(
    id: number,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null>;
  deleteCourse(id: number): Promise<boolean>;
}

export class CoursesService implements ICoursesService {
  private repository: ICoursesRepository = new CoursesRepository();

  async findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]> {
    return this.repository.findCourses(title, sortBy, direction);
  }

  async findCourseById(id: number): Promise<CourseViewDTO | null> {
    return this.repository.findCourseById(id);
  }

  async createCourse(course: CourseCreateDTO): Promise<CourseViewDTO> {
    const createdCourse: Omit<Course, "_id"> = {
      id: new Date().getTime(),
      title: course.title,
      price: course.price,
      studentsCount: 0,
    };

    return this.repository.createCourse(createdCourse);
  }

  async updateCourse(
    id: number,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null> {
    return this.repository.updateCourse(id, course);
  }

  async deleteCourse(id: number): Promise<boolean> {
    return this.repository.deleteCourse(id);
  }
}
