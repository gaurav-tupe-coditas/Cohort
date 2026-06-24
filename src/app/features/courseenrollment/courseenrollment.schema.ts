import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { UserSchmea } from "../user/user.schema.js";

export class CourseEnrollmentSchema extends Model<
  InferAttributes<CourseEnrollmentSchema>,
  InferCreationAttributes<CourseEnrollmentSchema>
> {
  declare id: CreationOptional<string>;
  declare student_id: string;
  declare course_id: string;
}

CourseEnrollmentSchema.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserSchmea,
        key: "id",
      },
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserSchmea,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "courseenrollment",
    timestamps: true,
  },
);
