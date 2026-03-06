import mongoose from "mongoose";
import { Course, UserDBType } from "../types";

const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME;

const userScheme = new mongoose.Schema({
  userName: { type: String, required: true },
  email: String,
  passwordHash: String,
  passwordSalt: String,
  createdAt: Date,
});

const courseScheme = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  studentsCount: Number,
});

export const UserModel = mongoose.model<UserDBType>("users", userScheme);
export const CourseModel = mongoose.model<Course>("courses", courseScheme);

export const connectDB = async () => {
  try {
    await mongoose.connect(`${mongoUri}/${mongoDbName}`);
    console.log("Connected successfully to server");
  } catch {
    console.log("Failed to connect to server");
    await mongoose.disconnect();
  }
};
