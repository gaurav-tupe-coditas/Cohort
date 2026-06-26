import { where } from "sequelize"
import courseRepo from "./course.repo.js"
import type{ CourseCreate, CourseUpdate } from "./course.types.js"
import { ResponseData, ResponseHandler } from "../../utils/response-handler.js"

const createCourse = async(data:CourseCreate)=>{
    try {
        const result = await courseRepo.create(data)
        return new ResponseHandler(new ResponseData(201,"Course Created"))
    } catch (error) {
        throw error
    }
}

const findCourse = async(where:Partial<{id:string;instructor_id:string}>)=>{
    try {
        return courseRepo.findOne({where})
    } catch (error) {
        throw error
    }
}

const findAllCourses = async(where:Partial<{instructor_id:string,name:string}>)=>{
    try {
        const result =await  courseRepo.findAll({where})
        return result
    } catch (error) {
        throw error
    }
}

const updateCourse = async(id:string,data:CourseUpdate)=>{
    try {
        const result = await courseRepo.update(data,{where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

const deleteCourse = async(id:string)=>{
    try {
        return await courseRepo.destroy({where:{id}})
    } catch (error) {
        throw error
    }
}

export default {createCourse,findCourse,findAllCourses,updateCourse,deleteCourse}