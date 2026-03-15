import { Request, Response } from "express";
import { UsersService } from "../../domain/users-service";
import { JwtService } from "../../application/jwt-service";
import { HttpStatuses } from "../../types";

export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(req: Request, res: Response) {
    const { login, email, password } = req.body;

    if (!login.trim() || !email.trim() || !password.trim()) {
      res.status(HttpStatuses.BAD_REQUEST).json({ message: "Bad request" });
      return;
    }

    const user = await this.usersService.createUser(login, email, password);

    if (!user) {
      res.status(HttpStatuses.BAD_REQUEST).json({ message: "Bad request" });
      return;
    }

    res.status(HttpStatuses.CREATED).send({
      message: "User created",
    });
  }

  async login(req: Request, res: Response) {
    const { loginOrEmail, password } = req.body;

    if (!loginOrEmail.trim() || !password.trim()) {
      res.status(HttpStatuses.BAD_REQUEST).json({ message: "Bad request" });
      return;
    }

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
