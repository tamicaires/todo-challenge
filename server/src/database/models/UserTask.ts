// models/UserTask.ts
import { Model, DataTypes } from "sequelize";
import db from ".";
import User from "./User";
import Task from "./Task";

class UserTask extends Model {
  declare id: string;
  declare user_id: string;
  declare task_id: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserTask.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "UserTask",
    tableName: "user_task",
    underscored: true,
    timestamps: false
  }
);

User.belongsToMany(Task, {
  foreignKey: "user_id",
  otherKey: "task_id",
  as: "tasks",
  through: UserTask,
});

Task.belongsToMany(User, {
  foreignKey: "task_id",
  otherKey: "user_id",
  as: "users",
  through: UserTask,
});

export default UserTask;
