export type UserCreateDTO = {
  login: string;
  email: string;
  password: string;
};

export type UserLoginDTO = {
  loginOrEmail: string;
  password: string;
};
