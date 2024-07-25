import { ModelStatic } from "sequelize";
import { UserTaskRepository } from "../../core/abstracts/userTask.abstract";
import UserTaskModel from "../models/UserTask";

export class SequelizeUserTaskRepository implements UserTaskRepository {
  private model: ModelStatic<UserTaskModel> = UserTaskModel;

  async assignUserToTask(userId: string, taskId: string): Promise<any> {
    console.log("Assigning Task:", { userId, taskId });

    // Verifique se userId e taskId não são null ou undefined
    if (!userId || !taskId) {
      throw new Error("User ID or Task ID cannot be null");
    }

    // Crie a relação entre o usuário e a tarefa
    const response = await this.model.create({
      user_id: userId,
      task_id: taskId,
    });
    console.log("Relation Created:", response.dataValues);
    return response.dataValues;
  }

  async getAllAssignments() {
    return await this.model.findAll();
  }
}
