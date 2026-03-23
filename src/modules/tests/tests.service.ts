import { ITestsRepository, TestsRepository } from "./tests.repository";

export interface ICourseService {
  clearCoursesDb(): Promise<void>;
}

export class TestsService {
  private repository: ITestsRepository = new TestsRepository();

  async clearCoursesDb(): Promise<void> {
    return this.repository.clearCoursesDb();
  }
}
