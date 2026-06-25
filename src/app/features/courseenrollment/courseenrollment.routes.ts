import { Router, type NextFunction, type Request, type Response } from "express";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { body } from "../../utils/validate.js";
import { ZEnrollmentCreate } from "./courseenrollment.types.js";
import courseenrollmentService from "./courseenrollment.service.js";
import { ErrorResponse, ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import { Route } from "../../routes/route.types.js";

const router = Router()

router.post("/",permissionHandler("enroll-course"),body(ZEnrollmentCreate),async(req:Request,res:Response,next:NextFunction)=>{try {
    const enrollment = await courseenrollmentService.enroll(req.user.userId,req.body.course_id);
    res.status(201).send(new ResponseHandler(new ResponseData(201,enrollment)))
} catch (error) {
    next(error)
}})

router.get("/my",permissionHandler("enroll-course"),async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const enrollments = await courseenrollmentService.findAllEnrollments({student_id:req.user.userId})
    res.status(200).send(new ResponseHandler(new ResponseData(200,enrollments)))

  } catch (error) {
    next(error)
  }  
})

router.get("/course/:courseId",permissionHandler("manage-courses"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const course_id = <string>req.params["courseId"]
        const enrollments = await courseenrollmentService.findAllEnrollments({course_id})
        res.status(200).send(new ResponseHandler(new ResponseData(200,enrollments)))
    } catch (error) {
        next (error)
    }
})

router.delete("/:courseId",permissionHandler("enroll-course"),async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const course_id = <string>req.params["courseId"]
            await courseenrollmentService.disenroll(req.user.userId,course_id)
            res.status(200).send(new ResponseHandler(new ResponseData(200,"Unerolled")))
        } catch (error) {
            next(error)
        }
    })

export default new Route("/enrollment",router)