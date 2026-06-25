import { CourseMaterialSchema } from "./coursematerial.schema.js"


const create = ()=>CourseMaterialSchema.create()

const findOne = ()=>CourseMaterialSchema.findOne()

const findAll = ()=>CourseMaterialSchema.findAll()

const update = ()=>CourseMaterialSchema.update()

const destroy = ()=>CourseMaterialSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}