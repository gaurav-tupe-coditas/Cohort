import { sendNewAssignmentNotification } from "../../utils/email.service.js";
import { ErrorResponse } from "../../utils/response-handler.js";
import courseService from "../course/course.service.js";
import courseenrollmentService from "../courseenrollment/courseenrollment.service.js";
import { UserSchmea } from "../user/user.schema.js";
import userService from "../user/user.service.js";
import assignmentRepo from "./assignment.repo.js";
import type { AssignmentCreate, AssignmentUpdate } from "./assignment.types.js";

const createAssignment = async(data:AssignmentCreate)=>{
    try {
        const result = await assignmentRepo.create(data)
        const course = await courseService.findCourse({id:data.course_id})
        if(!course)throw new ErrorResponse(404,"No course exist for this course")
        const enrollment = await courseenrollmentService.findAllEnrollments({course_id:data.course_id})
       const users = await Promise.allSettled(enrollment.map(en=>userService.findUser({id:en.student_id})))
        await Promise.allSettled(users.map(u=>{
            if(u.status=="fulfilled"){
                return sendNewAssignmentNotification(u.value.email,u.value.name,course.name,data.name)
           }},))
        return result
    } catch (error) {
        throw error
    }
}

const findAssignment = async(where:Partial<{id:string;course_id:string}>)=>{
try {
    const result = await assignmentRepo.findOne({where})
    return result
} catch (error) {
    throw error
}
}

const findAllAssignments = async(where:Partial<{course_id:string}>)=>{
    try {
        const result = await assignmentRepo.findAll({where})
        return result
    } catch (error) {
        throw error
    }
}

const updateAssignment = async(id:string,data:AssignmentUpdate)=>{
    try {
        const result = await assignmentRepo.update(data,{where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

const deleteAssignment = (id:string)=>{
    try {
        const result = assignmentRepo.destroy({where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

export default{createAssignment,findAssignment,findAllAssignments,updateAssignment,deleteAssignment}