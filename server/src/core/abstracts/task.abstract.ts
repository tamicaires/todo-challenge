import { UpdateTaskDTO } from "../dtos/task.dto";
import { Task } from "../entities/task.entity";

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>;
  abstract update(
    userId: string,
    taskId: string,
    task: UpdateTaskDTO
  ): Promise<void>;
  abstract delete(taskId: string): Promise<void>;
  abstract findById(taskId: string): Promise<Task | null>;
  abstract findTaskByUserId(
    userId: string,
    taskId: string
  ): Promise<Task | null>;
  abstract getAll(): Promise<Task[]>;
}
