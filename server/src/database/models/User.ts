import { Model, DataTypes } from "sequelize";
import db from "."; 

class UserModel extends Model {
  declare id: string;
  declare email: string;
  declare name: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "user",
    underscored: true,
    timestamps: true
  }
);

export default UserModel;
