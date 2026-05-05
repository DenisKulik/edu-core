import { Response } from "express";
import { UsersService } from "../../users/services/users.service";
import { JwtService } from "../services/jwt.service";
import { HttpStatuses, RequestBody } from "../../../types";
import { UserCreateDTO, UserLoginDTO } from "../../users/dto";

export class AuthController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(req: RequestBody<UserCreateDTO>, res: Response) {
    const user = await this.usersService.createUser(req.body);

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

  async login(req: RequestBody<UserLoginDTO>, res: Response) {
    const user = await this.usersService.checkCredentials(req.body);

    if (!user) {
      res.status(HttpStatuses.UNAUTHORIZED).json({ message: "Unauthorized" });
      return;
    }

    const token = await this.jwtService.createJWT(user.id);
    res.status(HttpStatuses.OK).send({ message: "Success", token });
  }
}
