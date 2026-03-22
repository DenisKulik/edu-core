export type CourseCreateDTO = {
  title: string;
  price: number;
};

export type CoursesQueryDTO = {
  title?: string;
  sortBy?: string;
  direction?: string;
};

export type CourseUpdateDTO = {
  title: string;
  price: number;
};

export type CourseURIParamsDTO = {
  id: string;
};

export type CourseViewDTO = {
  id: number;
  title: string;
  price: number;
};
