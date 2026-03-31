import { ObjectId } from "mongodb";
import { UserModel } from "../../../db";
import { User } from "../domain";
import { UserDocument } from "./user.document";
import { IUsersRepository } from "./users.repository.interface";

export class UsersRepository implements IUsersRepository {
  async getAllUsers() {
    const users = await UserModel.find().sort({ createdAt: -1 }).lean();
    return users.map(this.toDomain);
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const createdUser: UserDocument = await UserModel.create({
      _id: new ObjectId(),
      ...userData,
    });

    return this.toDomain(createdUser);
  }

  async findUserById(id: string) {
    const user = await UserModel.findOne({ _id: new ObjectId(id) });
    if (!user) return null;

    return this.toDomain(user);
  }

  async findUserByLoginOrEmail(loginOrEmail: string) {
    const user = await UserModel.findOne({
      $or: [{ userName: loginOrEmail }, { email: loginOrEmail }],
    });
    if (!user) return null;

    return this.toDomain(user);
  }

  private toDomain(doc: UserDocument): User {
    return {
      id: doc._id.toString(),
      userName: doc.userName,
      email: doc.email,
      passwordHash: doc.passwordHash,
      passwordSalt: doc.passwordSalt,
      createdAt: doc.createdAt,
    };
  }
}
