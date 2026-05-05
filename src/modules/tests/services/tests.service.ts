import { ITestsRepository } from "../repositories";

export interface ICourseService {
  clearCoursesDb(): Promise<void>;
}

export class TestsService {
  constructor(private readonly repository: ITestsRepository) {}

  async clearCoursesDb(): Promise<void> {
    return this.repository.clearCoursesDb();
  }
}
