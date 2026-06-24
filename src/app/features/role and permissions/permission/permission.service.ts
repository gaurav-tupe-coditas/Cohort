import permissionRepo from "./permission.repo.js"

const createPermission = async(name:string)=>{
try {
    const response = await permissionRepo.create(name)
    return response
} catch (error) {
    throw error
}
} 

const findPermission = async(findOptions:{id?:string,name?:string})=>{
try {
    const response = await permissionRepo.findOne({where:{...findOptions}})
    return response
} catch (error) {
    throw error
}
} 


const deletePermission = async(id:string)=>{
try {
    const response = await permissionRepo.destroy({where:{id}})
    return response
} catch (error) {
    throw error
}
} 


export default{
    createPermission,findPermission,deletePermission
}
