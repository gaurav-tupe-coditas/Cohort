import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../../connection/pg.connection.js";
import { RoleSchema } from "../role/role.schema.js";
import { PermissionSchema } from "../permission/permission.schema.js";


export class UserSchmea extends Model<InferAttributes<UserSchmea>,InferCreationAttributes<UserSchmea>>{
    declare id:CreationOptional<string>;
    declare role_id:string;
    declare permission_id:string;
}

UserSchmea.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
   role_id:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
        model:RoleSchema,
        key:"id"
    }
   },
   permission_id:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
        model:PermissionSchema,
        key:"id"
    }
   }
},{
    sequelize,
    tableName:"users",
    timestamps:true
})