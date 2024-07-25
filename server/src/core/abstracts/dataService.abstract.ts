import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";
import { TaskRepository } from "./task.abstract";
import { UserRepository } from "./user.abstract";
// import { TaskRepository } from "../repositories/task.abstract";
// import { UserRepository } from "../repositories/user.abstract";

export class DataService {
  private userRepository: UserRepository<User>;
  // private taskRepository: TaskRepository<Task>;

  constructor(
    userRepository: UserRepository<User>,
    // taskRepository: TaskRepository<Task>
  ) {
    this.userRepository = userRepository;
    // this.taskRepository = taskRepository;
  }
}
