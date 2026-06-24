import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../../connection/pg.connection.js";



export class PermissionSchema extends Model<InferAttributes<PermissionSchema>,InferCreationAttributes<PermissionSchema>>{
    declare id:CreationOptional<string>;
    declare name:string;
    
}

PermissionSchema.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    
},{
    sequelize,
    tableName:"permission",
    timestamps:true
})