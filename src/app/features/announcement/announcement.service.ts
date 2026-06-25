import announcementRepo from "./announcement.repo.js";
import type { AnnouncementCreate } from "./announcement.types.js";

const createAnnouncements = async(data:AnnouncementCreate)=>{
    try {
        const result = await announcementRepo.create(data)
        return result
    } catch (error) {
        throw error
    }
}

const getCourseAnnouncements = async(course_id:string)=>{
try {
    const result = await announcementRepo.findAll({where:{course_id}})
return result
} catch (error) {
    throw error
}
}

const deleteAnnouncemet = async(id:string)=>{
    try {
        const result = announcementRepo.destroy({where:{id}})
        return result
    } catch (error) {
        throw error
    }
}

export default{createAnnouncements,getCourseAnnouncements,deleteAnnouncemet}