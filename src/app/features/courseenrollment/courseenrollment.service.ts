import { ErrorResponse } from "../../utils/response-handler.js"
import courseenrollmentRepo from "./courseenrollment.repo.js"

const enroll = async(student_id:string,course_id:string)=>{
    try {
        const exisiting = await courseenrollmentRepo.findOne({where:{student_id,course_id}})
        if(exisiting)throw new ErrorResponse(409,"Already Enrolled in this course");
        return courseenrollmentRepo.create({student_id,course_id})
    } catch (error) {
        throw error
    }
    
}
const findEnrollment = async(where:Partial<{student_id:string;course_id:string,id:string}>)=>{
        try {
            const result = await courseenrollmentRepo.findOne({where})
            return result
        } catch (error) {
            throw error
        }
    }
    const findAllEnrollments = async(where:Partial<{student_id:string;course_id:string}>)=>{
        try {
            const result = courseenrollmentRepo.findAll({where})
        } catch (error) {
            throw error
        }
    }

    const disenroll = async(student_id:string,course_id:string)=>{
        try {
            const enrollment = await courseenrollmentRepo.findOne({where:{student_id,course_id}});
            if(!enrollment)throw new ErrorResponse(404,"Student Enrollment not found")
             return await courseenrollmentRepo.destroy({where:{student_id,course_id}})   
        } catch (error) {
            throw error
        }
    }

export default{
    enroll,findEnrollment,findAllEnrollments,disenroll
}