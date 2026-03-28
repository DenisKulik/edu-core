export type CourseCreateDTO = {
  title: string;
  price: number;
};

export type CourseUpdateDTO = {
  title: string;
  price: number;
};

export type CoursesQueryDTO = {
  title?: string;
  sortBy?: string;
  direction?: string;
};
