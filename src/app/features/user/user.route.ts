import { Router, type NextFunction, type Request, type Response } from "express";
import { Route } from "../../routes/route.types.js";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { body, params } from "../../utils/validate.js";
import { ZUserRouterCreate, ZUserRouterFindUser, ZUserUpdateObject,  } from "./user.types.js";
import userService from "./user.service.js";


const router = Router()

router.get("/:id",params(ZUserRouterFindUser),permissionHandler("find-user"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = req.params.id as string
        return await userService.findUser({id})
    } catch (error) {
        next(error)
    }
})

router.post("/",body(ZUserRouterCreate),permissionHandler("create-user"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        return await userService.createUser(req.body)
    } catch (error) {
        next(error)
    }
})

router.delete("/:id",params(ZUserRouterFindUser),permissionHandler("delete-user"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = req.params.id as string
        return await userService.deleteUser(id )
    } catch (error) {
        next(error)
    }
})

router.patch("/",body(ZUserUpdateObject),permissionHandler("update-user"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await userService.updateUser(req.body)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

export default new Route("/user",router)