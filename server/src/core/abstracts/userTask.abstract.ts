export abstract class UserTaskRepository {
  abstract assignUserToTask(userId: string, taskId: string): Promise<any>;
  abstract getAllAssignments(): Promise<any>;
}