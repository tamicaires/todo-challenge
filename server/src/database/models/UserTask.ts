import { Model, DataTypes } from "sequelize";
import db from ".";
import User from "./User";
import Task from "./Task";

class UserTask extends Model {
  public id!: string;
  public userId!: string;
  public taskId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserTask.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "UserTask",
    tableName: "user_task",
    underscored: true,
  }
);

User.belongsToMany(Task, {
  foreignKey: "userId",
  otherKey: "taskId",
  as: "tasks",
  through: UserTask,
});

Task.belongsToMany(User, {
  foreignKey: "taskId",
  otherKey: "userId",
  as: "users",
  through: UserTask,
});

export default UserTask;
