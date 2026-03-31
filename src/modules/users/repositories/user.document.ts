import { WithId } from "mongodb";

export type UserDocument = WithId<{
  userName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
}>;
