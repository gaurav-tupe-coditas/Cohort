import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "./response-handler.js";
import courseService from "../features/course/course.service.js";
import courseenrollmentService from "../features/courseenrollment/courseenrollment.service.js";

export const instructorOwns = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const course_id = req.params["courseId"] as string ?? req.body.course_id
        if(!course_id) throw new ErrorResponse(400,"course_id is required")

        const course = await courseService.findCourse({id:course_id})
        if(!course)throw new ErrorResponse(404,"Course not found")
        if(course.instructor_id!=req.user.userId)throw new ErrorResponse(403,"You do not own this course")
            next()
    } catch (error) {
        next(error)
    }
}

export const studentEnrolled = async(req:Request,res:Response,next:NextFunction)=>{try {
    const course_id = req.params["courseId"] as string ?? req.body.course_id
        if(!course_id) throw new ErrorResponse(400,"course_id is required")
    const enrollment = await courseenrollmentService.findEnrollment({student_id:req.user.userId,course_id})
        if(!enrollment)throw new ErrorResponse(403,"You are not enrolled in this course")
        next()
} catch (error) {
    next(error)
}}

