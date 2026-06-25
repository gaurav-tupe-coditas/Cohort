import type { Attributes, FindOptions, UpdateOptions } from "sequelize"
import { SubmissionSchema } from "./submission.schema.js"

const create = (data:{
    assignment_id:string,
    student_id:string,
    url:string,
})=>SubmissionSchema.create(data)

const findOne = (findOpts:FindOptions<Attributes<SubmissionSchema>>)=>SubmissionSchema.findOne(findOpts)

const findAll = (findOpts:FindOptions<Attributes<SubmissionSchema>>)=>SubmissionSchema.findAll(findOpts)

const update = (data:Partial<{grade:number,feedback:string}>,opts:UpdateOptions<Attributes<SubmissionSchema>>)=>SubmissionSchema.update(data,opts)



export default{
    create,findOne,findAll,update
}