import { ErrorResponse } from "../../utils/response-handler.js"
import assignmentService from "../assignment/assignment.service.js"
import submissionRepo from "./submission.repo.js"
import type { SubmissionServiceCreate } from "./submission.types.js"

const submit = async (data:SubmissionServiceCreate)=>{
try {
    const assignment = await assignmentService.findAssignment({id:data.assignment_id})
    if(!assignment)throw new ErrorResponse(404,"Assignment Not found")
    if(assignment.deadline && new Date() > assignment.deadline)throw new ErrorResponse(400,"Deadline has passed, submission has closed")

    const exisiting = await submissionRepo.findOne({where:{student_id:data.student_id,assignment_id:data.assignment_id}})
    if(exisiting) throw new ErrorResponse(400,"You have already submitted for this assignment")
    const result = await submissionRepo.create(data)

    return result
} catch (error) {
    throw error
}    
}

const getSubmission = async(id:string,student_id?:string)=>{
    try {
        const where:Record<string,string> = {id}
        if(student_id){ where["student_id"]=student_id}

        const submission = await submissionRepo.findOne({where})

        if(!submission) throw new ErrorResponse(404,"Submission not found")
            return submission
    } catch (error) {
        throw  error
    }
}

const getSubmissionsForAssignment = (assignment_id:string)=>{
    try {
        const result = submissionRepo.findAll({where:{assignment_id}})
        return result;
    } catch (error) {
        throw error
    }
}
const getMySubmissions = (student_id:string)=>{
    try {
        const result = submissionRepo.findAll({where:{student_id}})
        return result
    } catch (error) {
        throw error
    }
}

const grade = async(submissionId:string,
    updateData:Partial<{grade:number,feedback:string}>)=>{
    try {
        const result = await submissionRepo.update(updateData,{where:{id:submissionId}})
        return result
    } catch (error) {
        throw error
    }
}

export default{
    submit,getSubmission,getSubmissionsForAssignment,getMySubmissions,grade
}