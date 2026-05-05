import { ITestsRepository } from "./tests.repository.interface";

export class TestsRepository implements ITestsRepository {
  clearCoursesDb(): void {
    // this.db.courses = [];
  }
}
