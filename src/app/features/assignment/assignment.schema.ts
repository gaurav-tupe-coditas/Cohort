import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { CourseSchema } from "../course/course.schema.js";

export class AssignmentSchema extends Model<
  InferAttributes<AssignmentSchema>,
  InferCreationAttributes<AssignmentSchema>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  
  declare description: string;
  declare course_id: string;
  declare deadline: Date;
}

AssignmentSchema.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CourseSchema,
        key: "id",
      },
    },
    deadline:{
        type:DataTypes.DATE,
        allowNull:true
    }
  },
  {
    sequelize,
    tableName: "assignment",
    timestamps: true,
  },
);
