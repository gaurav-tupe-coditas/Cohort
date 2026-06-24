import { RolePermissionSchema } from "./rolepermission.schema.js";
import type { RolePermissionRepoFindOptions } from "./rolepermission.types.js";

const create = (role_id:string,permission_id:string)=>RolePermissionSchema.create({role_id,permission_id})

const findOne = (findOptions:RolePermissionRepoFindOptions)=>RolePermissionSchema.findOne(findOptions)

const findAll = (findOptions:RolePermissionRepoFindOptions)=>RolePermissionSchema.findAll(findOptions)

const destroy = (findOptions:RolePermissionRepoFindOptions)=>RolePermissionSchema.destroy(findOptions)


export default{
    create,findOne,findAll,destroy
}