import { Router, type NextFunction, type Request, type Response } from "express";
import z from "zod";
import { body } from "../../utils/validate.js";
import { ErrorResponse, ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import studycoachService from "./studycoach.service.js";
import { Route } from "../../routes/route.types.js";

const ZChatMessage = z.object({message:z.string().min(1).max(200)})

const router = Router()

router.post("/chat",body(ZChatMessage),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(req.user.role_name!=="STUDENT")throw new ErrorResponse(403,"Only students can use the coach")

            const reply = await studycoachService.chat(req.user.userId,req.body.message);
            res.status(200).send(new ResponseHandler(new ResponseData(200,reply)))
    } catch (error) {
        next(error)
    }
})


export default new Route("/coach",router)