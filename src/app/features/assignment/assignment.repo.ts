import type { Attributes, FindOptions, UpdateOptions } from "sequelize"
import { AssignmentSchema } from "./assignment.schema.js"
import type { AssignmentCreate, AssignmentUpdate } from "./assignment.types.js"


const create = (data:AssignmentCreate)=>AssignmentSchema.create(data)

const findOne = (findOpts:FindOptions<Attributes<AssignmentSchema>>)=>AssignmentSchema.findOne(findOpts)

const findAll = (findOpts:FindOptions<Attributes<AssignmentSchema>>)=>AssignmentSchema.findAll(findOpts)

const update = (updateData:AssignmentUpdate,updateOpts:UpdateOptions<Attributes<AssignmentSchema>>)=>AssignmentSchema.update(updateData,updateOpts)

const destroy = (findOpts:FindOptions<Attributes<AssignmentSchema>>)=>AssignmentSchema.destroy(findOpts)

export default{
    create,findOne,findAll,update,destroy
}