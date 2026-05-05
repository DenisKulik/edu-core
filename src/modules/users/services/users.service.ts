import bcrypt from "bcrypt";
import { eventBus } from "../../../utils";
import { UserCreateDTO, UserLoginDTO } from "../dto";
import { IUsersRepository } from "../repositories";
import { User } from "../domain";
import { IUsersService } from "./users.service.interface";
import { UserViewDTO } from "../dto/users.response.dto";

export class UsersService implements IUsersService {
  constructor(private readonly repository: IUsersRepository) {}

  async createUser(userDTO: UserCreateDTO) {
    const { login, email, password } = userDTO;
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this._generateHash(password, passwordSalt);

    const userData: Omit<User, "id"> = {
      userName: login,
      email,
      passwordHash,
      passwordSalt,
      createdAt: new Date(),
    };

    eventBus.emit("user:created", userData);

    const user = await this.repository.createUser(userData);

    return this.toUserViewDTO(user);
  }

  async findUserById(id: string) {
    return this.repository.findUserById(id);
  }

  async checkCredentials(userDTO: UserLoginDTO) {
    const { loginOrEmail, password } = userDTO;
    const user = await this.repository.findUserByLoginOrEmail(loginOrEmail);
    if (!user) return false;

    const passwordHash = await this._generateHash(password, user.passwordSalt);
    if (passwordHash !== user.passwordHash) {
      return false;
    }

    eventBus.emit("user:login", user);

    return user;
  }

  async _generateHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  private toUserViewDTO(dbUser: User): UserViewDTO {
    if (!dbUser.id) {
      throw new Error(`Invalid document: missing id field`);
    }

    return { id: dbUser.id, userName: dbUser.userName, email: dbUser.email };
  }
}
