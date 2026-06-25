import { CourseEnrollmentSchema } from "./courseenrollment.schema.js"


const create = ()=>CourseEnrollmentSchema.create()

const findOne = ()=>CourseEnrollmentSchema.findOne()

const findAll = ()=>CourseEnrollmentSchema.findAll()

const update = ()=>CourseEnrollmentSchema.update()

const destroy = ()=>CourseEnrollmentSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}