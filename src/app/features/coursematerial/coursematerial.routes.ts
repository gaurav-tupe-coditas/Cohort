import { Router, type NextFunction, type Request, type Response } from "express"
import { body, params } from "../../utils/validate.js"
import { permissionHandler } from "../role and permissions/permission.handler.js"
import { ZCourseMaterialCreate, ZCourseMaterialParams, ZCourseParams } from "./coursematerial.types.js"
import { instructorOwns, studentEnrolled } from "../../utils/scoping.js"
import coursematerialService from "./coursematerial.service.js"
import { ErrorResponse, ResponseData, ResponseHandler } from "../../utils/response-handler.js"
import { Route } from "../../routes/route.types.js"
import { upload } from "../../utils/multer.js"

const router = Router()

router.post("/",permissionHandler("manage-courses"),upload.single("file"),body(ZCourseMaterialCreate),instructorOwns,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.file)throw new ErrorResponse(400,"File not uploaded")
        const url = req.file.path
        const announcement = await coursematerialService.createCourseMaterial({...req.body,url})
        res.status(201).send(new ResponseHandler(new ResponseData(201,announcement)))
    } catch (error) {
        next(error)
    }
})

router.get("/course/:courseId",params(ZCourseMaterialParams),studentEnrolled,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const course_id=<string>req.params["courseId"]
        const announcementList = await coursematerialService.getCourseCourseMaterial(course_id)
        res.status(200).send(new ResponseHandler(new ResponseData(200,announcementList)))
    } catch (error) {
        next(error)
    }
})
//Scoper to check whether the instructor teaches this course which has this assignment id
router.delete("/:announcementId",permissionHandler("manage-courses"),params(ZCourseParams),instructorOwns,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = <string>req.params["announcementId"]
        const response = await coursematerialService.deleteCourseMaterial(id)
        res.status(201).send(new ResponseHandler(new ResponseData(201,"Deleted")))
    } catch (error) {
        next(error)
    }
})

export default new Route("/coursematerial",router)
