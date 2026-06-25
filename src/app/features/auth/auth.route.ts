import { Router, type NextFunction, type Request, type Response } from "express";
import { body } from "../../utils/validate.js";
import { ZAuthRouterLogIn, ZAuthRouterSignUp } from "./auth.types.js";
import authService from "./auth.service.js";
import { Route } from "../../routes/route.types.js";

const router = Router()

router.post("/login",body(ZAuthRouterLogIn),async(req:Request,res:Response,next:NextFunction)=>{
try {
    const {accessToken,response} = await authService.login(req.body)
    res.cookie("accessToken",accessToken,{maxAge:60*60*1000})
    res.status(response.data?.statusCode || 200).send(response)
} catch (error) {
    next(error)
}
})

router.post("/signup",body(ZAuthRouterSignUp),async(req:Request,res:Response,next:NextFunction)=>{
try {
     const response = await authService.signup(req.body)
     res.status(response.data?.statusCode || 201).send(response)
} catch (error) {
 next(error)
}
})

export default new Route("/auth",router)