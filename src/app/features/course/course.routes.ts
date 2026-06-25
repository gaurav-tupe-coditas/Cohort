import { Router, type NextFunction, type Request, type Response } from "express";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { body, params } from "../../utils/validate.js";
import { ZCourseCreate } from "./course.types.js";
import courseService from "./course.service.js";
import { ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import { tokenValidation } from "../../utils/token/token.validation.js";
import { instructorOwns } from "../../utils/scoping.js";
import { Route } from "../../routes/route.types.js";

const router = Router();

router.post("/",permissionHandler("manage-courses"),body(ZCourseCreate),async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const course = await courseService.createCourse(req.body)
       res.status(201).send(new ResponseHandler(new ResponseData(201,course)))
    } catch (error) {
        next(error)
    }
})

router.get("/",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const filter = req.user.role_name==="INSTRUCTOR" ?
        {instructor_id:req.user.userId} :{}
        const courses = await courseService.findAllCourses(filter)
        res.status(200).send(new ResponseHandler(new ResponseData(200,courses)))
    } catch (error) {
        next(error)
    }

    router.patch("/:courseId",permissionHandler("manage-courses"),instructorOwns,params(ZCourseFindParams),async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const course_id = <string>req.params["courseId"]
            const response = await courseService.updateCourse(course_id,req.body)
            res.status(200).send(new ResponseHandler(new ResponseData(200,"Course Updated")))
        } catch (error) {
            next(error)
        }

        router.delete("/:courseId",permissionHandler("manage-courses"),params(ZCourseFindParams),async(req:Request,res:Response,next:NextFunction)=>{
            try {
                const course_id = <string>req.params["courseId"]
                const response = await courseService.deleteCourse(course_id)
                res.status(200).send(new ResponseHandler(new ResponseData(200,"Course deleted")))
            } catch (error) {
                next(error)
            }
        })
    })

})


export default new Route("/course",router)