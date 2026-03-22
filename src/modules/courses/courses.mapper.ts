import { Course } from "./courses.entity";
import { CourseViewDTO } from "./courses.dto";

export const toCourseViewDto = (dbCourse: Course): CourseViewDTO => ({
  id: dbCourse.id,
  title: dbCourse.title,
  price: dbCourse.price,
});
