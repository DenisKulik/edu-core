import { CourseCreateDTO, CourseUpdateDTO, CourseViewDTO } from "../dto";

export interface ICoursesService {
  findCourses(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<CourseViewDTO[]>;
  findCourseById(id: string): Promise<CourseViewDTO | null>;
  createCourse(course: CourseCreateDTO): Promise<CourseViewDTO>;
  updateCourse(
    id: string,
    course: CourseUpdateDTO,
  ): Promise<CourseViewDTO | null>;
  deleteCourse(id: string): Promise<boolean>;
}
