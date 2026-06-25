import z from "zod";

export const ZAssignmentCreate = z.object({
name:z.string().min(1),
description:z.string().optional(),
course_id:z.uuid(),
deadline:z.iso.datetime().optional(),
})

export const ZAssignmentUpdate = ZAssignmentCreate.omit({course_id:true})

export const ZAssignmentParams = z.object({assignmentId:z.uuid()})

export const ZCourseParams = z.object({courseId:z.uuid()})


export type AssignmentCreate = {name:string,description?:string,course_id:string,deadline?:Date}
export type AssignmentUpdate = Omit<AssignmentCreate,"course_id">