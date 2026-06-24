import roleRepo from "./role.repo.js"



const createRole = async(name:string)=>{
try {
    const response = await roleRepo.create(name)
    return response
} catch (error) {
    throw error
}
} 

const findRole = async(findOptions:{id?:string,name?:string})=>{
try {
    const response = await roleRepo.findOne({where:{...findOptions}})
    return response
} catch (error) {
    throw error
}
} 


const deleteRole = async(id:string)=>{
try {
    const response = await roleRepo.destroy({where:{id}})
    return response
} catch (error) {
    throw error
}
} 


export default{
    createRole,findRole,deleteRole
}
