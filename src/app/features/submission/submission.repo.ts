import { SubmissionSchema } from "./submission.schema.js"

const create = ()=>SubmissionSchema.create()

const findOne = ()=>SubmissionSchema.findOne()

const findAll = ()=>SubmissionSchema.findAll()

const update = ()=>SubmissionSchema.update()

const destroy = ()=>SubmissionSchema.destroy()

export default{
    create,findOne,findAll,update,destroy
}