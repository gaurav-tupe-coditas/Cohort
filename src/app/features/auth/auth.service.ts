import { compare } from "bcryptjs"
import { hashPassword } from "../../utils/hash.js"
import userService from "../user/user.service.js"
import { AUTH_RESPONSE } from "./auth.response.js"
import type { AuthServiceLogIn, AuthServiceSignUp } from "./auth.types.js"
import jwtService from "../../utils/token/jwt.service.js"

const login = async (LoginData:AuthServiceLogIn)=>{
    try {
        const user = await userService.findUser({email:LoginData.email})

        if(!user)throw AUTH_RESPONSE.INVALID_CREDENTIALS.err
        const passwordMatched = await compare(LoginData.password,user.password)
        if(!passwordMatched) AUTH_RESPONSE.INVALID_CREDENTIALS.err

        const accessToken = jwtService.signAccessToken({userId:user.id,email:user.email,name:user.name,role_id:user.role_id,password_version:user.password_version
        })
        const response = AUTH_RESPONSE.LOGIN_SUCCESSFULL
        return {accessToken,response}

    } catch (error) {
        throw error
    }
}

const signup = async (SignUpData:AuthServiceSignUp)=>{
    try {
        const student_role_id = "adfs"
        const result = await userService.createUser({...SignUpData,role_id:student_role_id})
        return result
    } catch (error) {
        throw error
    }
}


export default {
    login,signup
}
