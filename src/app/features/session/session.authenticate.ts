import jwtService from "../../utils/token/jwt.service.js";
import courseService from "../course/course.service.js";
import courseenrollmentService from "../courseenrollment/courseenrollment.service.js";
import roleService from "../role and permissions/role/role.service.js";

export const authenticateInstructor = async (
  accessToken: string,
  courseId: string,
) => {
  try {
    const payload = jwtService.verifyAccessToken(accessToken);
    if (!payload) return false;

    const role = await roleService.findRole({ id: payload.role_id });
    if (!role) return false;
    if (role.name !== "INSTRUCTOR") return false;
    const course = await courseService.findCourse({ id: courseId });
    if (!course) return false;
    if (course.instructor_id != payload.userId) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const authenticateStudent = async (
  accessToken: string,
  courseId: string,
) => {
  try {
    const payload = jwtService.verifyAccessToken(accessToken);
    if (!payload) return false;

    const course = await courseService.findCourse({ id: courseId });
    if (!course) return false;
    const isInCourse = await courseenrollmentService.findEnrollment({
      student_id: payload.userId,
      course_id: courseId,
    });
    if (!isInCourse) return false;
    return true;
  } catch (error) {
    return false;
  }
};
