import { AssignmentSchema } from "./assignment.schema.js"


const create = ()=>AssignmentSchema.create()

const findOne = ()=>AssignmentSchema.findOne()

const findAll = ()=>AssignmentSchema.findAll()

const update = ()=>AssignmentSchema.update()

const destroy = ()=>AssignmentSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}