import z from "zod";

export const ZCourseCreate = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  instructor_id: z.uuid(),
});

export type CourseCreate = z.infer<typeof ZCourseCreate>

export const ZCourseUpdate = z.object({
    name:z.string().min(1).optional(),
    description:z.string().min(1).optional()
})


export type CourseUpdate = Partial<{name:string,description:string}>