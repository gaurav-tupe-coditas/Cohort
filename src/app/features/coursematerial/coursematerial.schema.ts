import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { CourseSchema } from "../course/course.schema.js";

export class CourseMaterialSchema extends Model<
  InferAttributes<CourseMaterialSchema>,
  InferCreationAttributes<CourseMaterialSchema>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare course_id: string;
  declare url: string;
}

CourseMaterialSchema.init(
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
    url:{
        type:DataTypes.TEXT,
        allowNull:false
    }
  },
  {
    sequelize,
    tableName: "coursematerial",
    timestamps: true,
  },
);
