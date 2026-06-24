import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connection/pg.connection.js";

export class UserSchmea extends Model<InferAttributes<UserSchmea>,InferCreationAttributes<UserSchmea>>{
    declare id:CreationOptional<string>;
    declare name:string;
    declare email:string;
    declare password:string;
    declare password_version:number;
    declare role_id:string;
}

UserSchmea.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    password_version:{
        type:DataTypes.TEXT,
        allowNull:false,
        defaultValue:0
    },
    role_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:UserSchmea,
            key:"id"
        }
    }
},{
    sequelize,
    tableName:"users",
    timestamps:true
})