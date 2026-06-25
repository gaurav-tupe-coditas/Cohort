import assignmentRepo from "./assignment.repo.js";
import type { AssignmentCreate, AssignmentUpdate } from "./assignment.types.js";

const createAssignment = async(data:AssignmentCreate)=>{
    try {
        const result = await assignmentRepo.create(data)
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