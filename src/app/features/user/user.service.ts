import { where } from "sequelize"
import { hashPassword } from "../../utils/hash.js"
import userRepo from "./user.repo.js"
import type { UserServiceCreate } from "./user.types.js"
import { USER_RESPONSE } from "./user.response.js"

const createUser = async(createUserData:UserServiceCreate)=>{
    try {
        const userExists = await findUser({email:createUserData.email})
        if(userExists)throw USER_RESPONSE.USER_ALREADY_EXISTS.err
        const hashedPassword = await hashPassword(createUserData.password)
        const userData = {...createUserData,password:hashedPassword}
        await userRepo.create(userData)
        return USER_RESPONSE.USER_CREATED

    } catch (error) {
        throw error
    }
}

const findUser = async (findUserData:any)=>{
    try {
        const userData = await userRepo.findOne({where:{...findUserData}})
        return userData
    } catch (error) {
        
    }
}

const findAllUser = async()=>{
    try {
        
    } catch (error) {
        
    }
}

const deleteUser = async()=>{
    try {
        
    } catch (error) {
        
    }
}

const updateUser = async()=>{
    try {
        
    } catch (error) {
        
    }
}


export default{
    createUser,findUser,findAllUser,deleteUser,updateUser
}
