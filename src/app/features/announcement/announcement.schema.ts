import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { CourseSchema } from "../course/course.schema.js";


export class AnnouncementSchema extends Model<
  InferAttributes<AnnouncementSchema>,
  InferCreationAttributes<AnnouncementSchema>
> {
  declare id: CreationOptional<string>;
    declare course_id:string;
    declare title:string;
    declare description:string
  
}

AnnouncementSchema.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    course_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:CourseSchema,
            key:"id"
        }
    },
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }
  },
  {
    sequelize,
    tableName: "announcement",
    timestamps: true,
  },
);
