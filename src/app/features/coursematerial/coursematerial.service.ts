import coursematerialRepo from "./coursematerial.repo.js"
import type { CourseMaterialCreate } from "./coursematerial.types.js"

const createCourseMaterial = async(data:CourseMaterialCreate)=>{
    try {
        const result = await coursematerialRepo.create(data)
        return result
    } catch (error) {
        throw error
    }
}

const getCourseCourseMaterial = async(course_id:string)=>{
try {
    const result = await coursematerialRepo.findAll({where:{course_id}})
return result
} catch (error) {
    throw error
}
}

const deleteCourseMaterial = async(id:string)=>{
    try {
        const result = coursematerialRepo.destroy({where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

export default{
    createCourseMaterial,getCourseCourseMaterial,deleteCourseMaterial
}