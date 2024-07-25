import { Model, DataTypes } from "sequelize";
import db from ".";
import Project from "./Project";
import Task from "./Task";

class ProjectTask extends Model {
  declare id: string;
  declare projectId: string;
  declare taskId: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProjectTask.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
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
    modelName: "ProjectTask",
    tableName: "project_task",
    underscored: true,
    timestamps: true,
  }
);

Task.belongsToMany(Project, {
  foreignKey: "taskId",
  otherKey: "projectId",
  as: "projects",
  through: ProjectTask,
});

Project.belongsToMany(Task, {
  foreignKey: "projectId",
  otherKey: "taskId",
  as: "tasks",
  through: ProjectTask,
});
export default ProjectTask;
