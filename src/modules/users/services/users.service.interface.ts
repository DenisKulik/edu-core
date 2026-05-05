import { UserCreateDTO, UserLoginDTO } from "../dto";
import { UserViewDTO } from "../dto/users.response.dto";

export interface IUsersService {
  createUser(userDTO: UserCreateDTO): Promise<UserViewDTO>;
  findUserById(id: string): Promise<UserViewDTO | null>;
  checkCredentials(userDTO: UserLoginDTO): Promise<UserViewDTO | false>;
}
