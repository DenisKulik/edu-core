export type RegisterDTO = {
  login: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  loginOrEmail: string;
  password: string;
};
