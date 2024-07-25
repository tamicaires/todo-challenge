import { Model } from "sequelize";
import { UserRepository } from "../core/abstracts/user.abstract";
import { User } from "../core/entities/user.entity";
import UserModel from "./models/User";
import { SequelizeUserRepository } from "./repositories/SequelizeUserRepository";

export class InitializeService {
  userRepository: UserRepository<User>;

  constructor(
    private userModel: Model<UserModel>
  ) // private taskModel: Model<TaskModel>
  {
    this.userRepository = new SequelizeUserRepository(userModel);
    // this.taskRepository = new TaskMongoRepository(taskModel); // Uncomment if needed
  }

  // Optionally you can include an initialize method if additional setup is needed
  initialize() {
    // Any additional initialization logic can go here
  }
}
