import z from "zod";

export const ZCourseMaterialCreate = z.object({
  course_id: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
});
export const ZCourseMaterialServiceCreate = ZCourseMaterialCreate.extend({
  url: z.url(),
});

export const ZCourseMaterialParams = z.object({
  materialId: z.uuid(),
});

export const ZCourseParams = z.object({
  courseId: z.uuid(),
});

export type CourseMaterialCreate = z.infer<typeof ZCourseMaterialServiceCreate>;
