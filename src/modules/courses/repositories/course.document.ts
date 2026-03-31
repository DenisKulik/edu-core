import { WithId } from "mongodb";

export type CourseDocument = WithId<{
  id: string;
  title: string;
  price: number;
  studentsCount: number;
}>;
