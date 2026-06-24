import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { RoleSchema } from "../role and permissions/role/role.schema.js";

export class UserSchmea extends Model<
  InferAttributes<UserSchmea>,
  InferCreationAttributes<UserSchmea>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare password_version: CreationOptional<number>;
  declare role_id: string;

  toSafeJson() {
    const { password,password_version, ...safe } = this.toJSON();
    return safe;
  }
}

UserSchmea.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password_version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: RoleSchema,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  },
);
