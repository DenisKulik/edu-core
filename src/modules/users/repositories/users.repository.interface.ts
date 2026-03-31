import { User } from "../domain";

export interface IUsersRepository {
  getAllUsers(): Promise<User[]>;
  createUser(user: Omit<User, "id">): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUserByLoginOrEmail(loginOrEmail: string): Promise<User | null>;
}
