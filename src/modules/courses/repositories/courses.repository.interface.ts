import { Course } from "../domain/courses.entity";

export interface ICoursesRepository {
  findAll(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  create(course: Course): Promise<Course>;
  update(id: string, course: Partial<Course>): Promise<Course | null>;
  delete(id: string): Promise<boolean>;
}
