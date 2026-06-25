import type { Attributes, FindOptions, UpdateOptions } from "sequelize";
import { CourseSchema } from "./course.schema.js";

const create = (data:{name:string;description:string,instructor_id:string})=>CourseSchema.create(data)

const findOne = (findOptions:FindOptions<Attributes<CourseSchema>>)=>CourseSchema.findOne(findOptions)

const findAll = (findOptions:FindOptions<Attributes<CourseSchema>>)=>CourseSchema.findAll(findOptions)

const update = (data:Partial<{name:string;description:string;instructor_id:string}>,findOpts:UpdateOptions<Attributes<CourseSchema>>)=>CourseSchema.update(data,findOpts)

const destroy = (findOptions:FindOptions<Attributes<CourseSchema>>)=>CourseSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}