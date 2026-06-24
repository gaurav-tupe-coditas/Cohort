import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../../connection/pg.connection.js";


export class RoleSchema extends Model<InferAttributes<RoleSchema>,InferCreationAttributes<RoleSchema>>{
    declare id:CreationOptional<string>;
    declare name:string;
    
}

RoleSchema.init({
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
    tableName:"users",
    timestamps:true
})