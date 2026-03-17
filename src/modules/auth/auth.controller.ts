import { Request, Response } from "express";
import { UsersService } from "../../domain/users-service";
import { JwtService } from "../../application/jwt-service";
import { HttpStatuses } from "../../types";
import { loginSchema, registerSchema } from "./auth.schema";

export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(req: Request, res: Response) {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(HttpStatuses.BAD_REQUEST).send({
        errors: result.error.issues,
      });
      return;
    }

    const { login, email, password } = result.data;

    const user = await this.usersService.createUser(login, email, password);

    if (!user) {
      res
        .status(HttpStatuses.BAD_REQUEST)
        .json({ message: "Something went wrong" });
      return;
    }

    res.status(HttpStatuses.CREATED).send({
      message: "User created",
    });
  }

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);
    console.log("result", result);

    if (!result.success) {
      res.status(HttpStatuses.BAD_REQUEST).send({
        errors: result.error.issues,
      });
      return;
    }

    const { loginOrEmail, password } = result.data;

    const user = await this.usersService.checkCredentials(
      loginOrEmail,
      password,
    );

    if (!user) {
      res.status(HttpStatuses.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const token = await this.jwtService.createJWT(user);
    res.status(HttpStatuses.OK).send({ message: "Success", token });
  }
}
