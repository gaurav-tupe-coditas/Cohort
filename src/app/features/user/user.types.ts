import type { Attributes, FindOptions } from "sequelize"
import type { UserSchmea } from "./user.schema.js"
import z, { email } from "zod"






export interface UserRepoCreateData{
    name:string,
    email:string,
    password:string,
    role_id:string
}

export type UserRepoFindOptions = FindOptions<Omit<Attributes<UserSchmea>,"password">>

export type UserRepoUpdateDataOptions= UserRepoCreateData


export const ZUserServiceCreate = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(),
    role_id:z.uuid()
})

export type UserServiceCreate = z.infer<typeof ZUserServiceCreate>