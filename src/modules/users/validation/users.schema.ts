import { z } from "zod";

export const registerSchema = z.object({
  login: z.string().min(4).max(50),
  email: z.email().min(4).max(50),
  password: z.string().min(6).max(50),
});

export const loginSchema = z.object({
  loginOrEmail: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
});
