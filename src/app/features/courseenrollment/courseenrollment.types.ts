import z from "zod";

export const ZEnrollmentFind =z.object({enrollmentId:z.uuid()})

export const ZEnrollmentCreate = z.object({course_id:z.uuid()})

export type EnrollmentCreate = z.infer<typeof ZEnrollmentCreate>

