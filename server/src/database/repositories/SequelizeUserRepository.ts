import { ModelStatic } from "sequelize";
import { UserRepository } from "../../core/abstracts/user.abstract";
import { User } from "../../core/entities/user.entity";
import UserModel from "../models/User";

export class SequelizeUserRepository implements UserRepository {
  private model: ModelStatic<UserModel> = UserModel;

  async create(user: User): Promise<User> {
    return await this.model.create({...user});
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findOne({ where: { email } });
  }

  async get(userId: string): Promise<User> {
    const user = await this.model.findByPk(userId);
    console.log("userservice dentro de task", user);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.model.findAll();
  }
}
