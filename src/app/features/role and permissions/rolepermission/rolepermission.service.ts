import { where } from "sequelize"
import permissionService from "../permission/permission.service.js"
import roleService from "../role/role.service.js"
import rolepermissionRepo from "./rolepermission.repo.js"
import { ROLE_PERMISSION_RESPONSE } from "./rolepermission.response.js"

const create = async(createData:{role_id:string,permission_id:string})=>{
try {
    const role = await roleService.findRole({id:createData.role_id})
    const permission = await permissionService.findPermission({id:createData.permission_id})

    if(!role || !permission)throw  ROLE_PERMISSION_RESPONSE.INVALID_ROLE_OR_PERMISSION.err

    const result = rolepermissionRepo.create(createData.role_id,createData.permission_id)
    return result
} catch (error) {
    throw error
}
}

const findOne = async(findData:{role_id?:string,permission_id?:string})=>{
try {
    const result = rolepermissionRepo.findOne({where:findData})
    return result
} catch (error) {
    throw error
}
}

const destroy = async(id:string)=>{
try {
    const result= rolepermissionRepo.destroy({where:{id}})
    return result
} catch (error) {
    throw error
}
}


export default{
    create,findOne,destroy
}