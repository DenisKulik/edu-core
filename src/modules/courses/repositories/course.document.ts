import { ObjectId } from "mongodb";

export type CourseDocument = {
  _id: ObjectId;
  id: string;
  title: string;
  price: number;
  studentsCount: number;
};
