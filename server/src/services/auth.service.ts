import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import { compare } from "bcrypt";
import { UserPayload } from "../core/entities/user.entity";
import { sign } from "jsonwebtoken";
import { jwtKeys } from "../config/constants";

export class AuthService {
  private userModel: ModelStatic<User> = User;

  async authenticate(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Email or password invalid");
    }

    const payload: UserPayload = {
      id: user.id,
      username: user.name,
      email: user.email,
    };

    const secret = jwtKeys.jwtSecret;

    const token = sign({ id: user.id }, secret, { expiresIn: "30d" });

    return { payload, token };
  }
}
