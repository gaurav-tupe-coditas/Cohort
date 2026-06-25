import z from "zod";

export const ZAnnouncementCreate = z.object({
    course_id:z.uuid(),
    title:z.string().min(1),
    description:z.string().min(1)
})

export const ZAnnoucementParams = z.object({
    announcementId:z.uuid()
})

export const ZCourseParams = z.object({
    courseId:z.uuid()
})



export type AnnouncementCreate = z.infer<typeof ZAnnouncementCreate>