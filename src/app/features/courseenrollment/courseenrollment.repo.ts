import type { Attributes, FindOptions } from "sequelize";
import { CourseEnrollmentSchema } from "./courseenrollment.schema.js"


const create = (data:{student_id:string;course_id:string})=>CourseEnrollmentSchema.create(data)

const findOne = (findOpts:FindOptions<Attributes<CourseEnrollmentSchema>>)=>CourseEnrollmentSchema.findOne(findOpts)

const findAll = (findOpts:FindOptions<Attributes<CourseEnrollmentSchema>>)=>CourseEnrollmentSchema.findAll(findOpts)



const destroy = (findOpts:FindOptions<Attributes<CourseEnrollmentSchema>>)=>CourseEnrollmentSchema.destroy(findOpts)

export default{
    create,findOne,findAll,destroy
}