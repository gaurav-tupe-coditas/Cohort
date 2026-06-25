
import type { Attributes, FindOptions } from "sequelize";
import { AnnouncementSchema } from "./announcement.schema.js"


const create = (data:{course_id:string,title:string;description:string})=>AnnouncementSchema.create(data)

const findOne = (findOpts:FindOptions<Attributes<AnnouncementSchema>>)=>AnnouncementSchema.findOne(findOpts)


const findAll = (findOpts:FindOptions<Attributes<AnnouncementSchema>>)=>AnnouncementSchema.findAll(findOpts)

const destroy = (findOpts:FindOptions<Attributes<AnnouncementSchema>>)=>AnnouncementSchema.destroy(findOpts)

export default{
    create,findOne,destroy,findAll
}