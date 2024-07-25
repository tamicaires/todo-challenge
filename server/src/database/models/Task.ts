import { Model, DataTypes } from "sequelize";
import db from ".";

class TaskModel extends Model {
  declare id: string;
  declare title: string;
  declare description?: string;
  declare isDone: boolean;
  declare expectedDate: Date;
  declare users: string[];
  declare createdBy?: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare completedAt?: Date;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expectedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Task",
    tableName: "task",
    timestamps: true,
    underscored: true
  }
);

export default TaskModel;
