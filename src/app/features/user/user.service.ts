import { where } from "sequelize"
import { hashPassword } from "../../utils/hash.js"
import userRepo from "./user.repo.js"
import type { FindAllUserData, FindUserData, UserServiceCreate, UserUpdateData } from "./user.types.js"
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

const findUser = async (findUserData:FindUserData)=>{
    try {
        const userData = await userRepo.findOne({where:{...findUserData}})
        return userData
    } catch (error) {
        throw error
    }
}

const findAllUser = async(findUserData:FindAllUserData)=>{
    try {
        const userData = await userRepo.findOne({where:{...findUserData}})
        return userData
    } catch (error) {
        throw error
    }
}

const deleteUser = async(id:string)=>{
    try {
        const result = userRepo.destroy({where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

const updateUser = async(updateDetails:UserUpdateData)=>{
    try {
        const result = userRepo.update(updateDetails.updateDetails,{where:updateDetails.findDetails})
        return result
    } catch (error) {
        throw error
    }
}


export default{
    createUser,findUser,findAllUser,deleteUser,updateUser
}
