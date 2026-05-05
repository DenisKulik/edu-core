import jwt from "jsonwebtoken";
import { settings } from "../../../settings";

export class JwtService {
  async createJWT(userId: string) {
    const token = jwt.sign({ userId: userId }, settings.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      resultCode: 0,
      data: {
        token,
      },
    };
  }

  async getUserIdByToken(token: string) {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET);
      return result.userId;
    } catch {
      return null;
    }
  }
}
