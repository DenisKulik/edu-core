import { Course } from "../domain/courses.entity";
import { SortOrder } from "mongoose";
import { CourseModel } from "../../../db";
import { ICoursesRepository } from "./courses.repository.interface";
import { CourseDocument } from "./course.document";

export class CoursesRepository implements ICoursesRepository {
  async findAll(
    title?: string,
    sortBy?: string,
    direction?: string,
  ): Promise<Course[]> {
    const filter: any = {};
    const sort: Record<string, SortOrder> = {};

    if (title) {
      filter.title = title;
    }
    if (sortBy) {
      sort[sortBy] = direction === "asc" ? 1 : -1;
    }

    const coursesDoc = await CourseModel.find(filter).sort(sort).lean();
    return coursesDoc.map(this.toDomain);
  }

  async findById(id: string): Promise<Course | null> {
    const courseDoc: CourseDocument | null = await CourseModel.findOne({
      id,
    });

    if (!courseDoc) return null;

    return this.toDomain(courseDoc);
  }

  async create(course: Course): Promise<Course> {
    const createdCourseDoc: CourseDocument = await CourseModel.create(course);
    return this.toDomain(createdCourseDoc);
  }

  async update(id: string, course: Partial<Course>): Promise<Course | null> {
    const updatedCourseDoc: CourseDocument | null =
      await CourseModel.findOneAndUpdate(
        { id },
        { $set: course },
        { new: true },
      );

    return updatedCourseDoc ? this.toDomain(updatedCourseDoc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CourseModel.deleteOne({ id });
    return result.deletedCount > 0;
  }

  private toDomain(doc: CourseDocument): Course {
    if (!doc.id) {
      throw new Error(`Invalid document: missing id field`);
    }

    return {
      id: doc.id,
      title: doc.title,
      price: doc.price,
      studentsCount: doc.studentsCount,
    };
  }
}
