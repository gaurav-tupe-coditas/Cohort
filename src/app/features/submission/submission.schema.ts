import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";
import { CourseSchema } from "../course/course.schema.js";
import { AssignmentSchema } from "../assignment/assignment.schema.js";
import { UserSchmea } from "../user/user.schema.js";

export class SubmissionSchema extends Model<
  InferAttributes<SubmissionSchema>,
  InferCreationAttributes<SubmissionSchema>
> {
  declare id: CreationOptional<string>;
  declare assignment_id: string;
  declare student_id: string;
  declare url: string;
  declare grade: CreationOptional<number>;
  declare feedback:CreationOptional<string>;
  declare submission_time: CreationOptional<Date>;
}

SubmissionSchema.init(
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

    assignment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: AssignmentSchema,
        key: "id",
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feedback:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    submission_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "submission",
    timestamps: true,
  },
);
