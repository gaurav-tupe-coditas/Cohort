import z from "zod";

export const ZSubmisisonCreate = z.object({
    assignment_id:z.uuid(),
})

export const ZGrade = z.object({
    grade:z.number().int().min(0).max(100),
    feedback:z.string().min(1)
}).partial()

export const ZSubmissionParams = z.object({submissionId:z.uuid()})

export const ZAssignmentParams = z.object({assignmentId:z.uuid()})

export type SubmissionCreate = z.infer<typeof ZSubmisisonCreate>

export type SubmissionServiceCreate = {
    assignment_id:string,
    student_id:string,
    url:string,
}