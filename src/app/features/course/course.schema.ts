import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { UserSchmea } from "../user/user.schema.js";

export class CourseSchema extends Model<
  InferAttributes<CourseSchema>,
  InferCreationAttributes<CourseSchema>
> {
  declare id: CreationOptional<string>;
  declare instructor_id: string;
  declare name: string;
  declare description: string;
}

CourseSchema.init(
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
    instructor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserSchmea,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "course",
    timestamps: true,
  },
);
