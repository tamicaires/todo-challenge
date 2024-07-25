import { ModelStatic } from "sequelize";
import User from "../database/models/User";
import resp from "../utils/resp";
import { CreateUserDTO } from "../core/dtos/user.dto";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { UserRepository } from "../core/abstracts/user.abstract";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(user: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw Error("User already exists");
    }

    const hash_password = await hash(user.password, 8);

    const newUser = {
      id: randomUUID(),
      name: user.name,
      email: user.email,
      password: hash_password,
    };

    return await this.userRepository.create({ ...newUser });
  }

  async getAll() {
    const users = await this.userRepository.getAll();
    return resp(200, users);
  }
}
