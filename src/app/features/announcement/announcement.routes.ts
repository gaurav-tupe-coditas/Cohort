import { Router, type NextFunction, type Request, type Response } from "express";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { ZAnnoucementParams, ZAnnouncementCreate, ZCourseParams } from "./announcement.types.js";
import { body, params } from "../../utils/validate.js";
import { instructorOwns, InstructorOwnsAnnouncement, studentEnrolled } from "../../utils/scoping.js";
import announcementService from "./announcement.service.js";
import { ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import { Route } from "../../routes/route.types.js";

const router = Router()

router.post("/",permissionHandler("manage-courses"),body(ZAnnouncementCreate),instructorOwns,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const announcement = await announcementService.createAnnouncements(req.body)
        res.status(201).send(new ResponseHandler(new ResponseData(201,announcement)))
    } catch (error) {
        next(error)
    }
})


//add permission to check whether they can view the announcements
router.get("/course/:courseId",params(ZCourseParams),studentEnrolled,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const course_id=<string>req.params["courseId"]
        const announcementList = await announcementService.getCourseAnnouncements(course_id)
        res.status(200).send(new ResponseHandler(new ResponseData(200,announcementList)))
    } catch (error) {
        next(error)
    }
})
//Scoper to check whether the instructor teaches this course which has this assignment id
router.delete("/:announcementId",permissionHandler("manage-courses"),params(ZAnnoucementParams),InstructorOwnsAnnouncement,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = <string>req.params["announcementId"]
        const response = await announcementService.deleteAnnouncemet(id)
        res.status(201).send(new ResponseHandler(new ResponseData(201,"Deleted")))
    } catch (error) {
        next(error)
    }
})

export default new Route("/announcement",router)
