import { ObjectId, WithId } from "mongodb";

export type Course = WithId<{
  _id: ObjectId;
  id: number;
  title: string;
  price: number;
  studentsCount: number;
}>;
