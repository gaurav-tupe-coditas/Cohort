import { AnnouncementSchema } from "./announcement.schema.js"


const create = ()=>AnnouncementSchema.create()

const findOne = ()=>AnnouncementSchema.findOne()

const findAll = ()=>AnnouncementSchema.findAll()

const update = ()=>AnnouncementSchema.update()

const destroy = ()=>AnnouncementSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}