import type { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "./response-handler.js";
import courseService from "../features/course/course.service.js";
import courseenrollmentService from "../features/courseenrollment/courseenrollment.service.js";
import assignmentService from "../features/assignment/assignment.service.js";
import submissionService from "../features/submission/submission.service.js";
import coursematerialService from "../features/coursematerial/coursematerial.service.js";

export const instructorOwns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course_id = (req.params["courseId"] as string) ?? req.body.course_id;
    if (!course_id) throw new ErrorResponse(400, "course_id is required");

    const course = await courseService.findCourse({ id: course_id });
    if (!course) throw new ErrorResponse(404, "Course not found");
    if (course.instructor_id != req.user.userId)
      throw new ErrorResponse(403, "You do not own this course");
    next();
  } catch (error) {
    next(error);
  }
};

export const studentEnrolled = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const course_id = (req.params["courseId"] as string) ?? req.body.course_id;
    if (!course_id) throw new ErrorResponse(400, "course_id is required");
    const enrollment = await courseenrollmentService.findEnrollment({
      student_id: req.user.userId,
      course_id,
    });
    if (!enrollment)
      throw new ErrorResponse(403, "You are not enrolled in this course");
    next();
  } catch (error) {
    next(error);
  }
};

export const InstructorOwnsAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assignment_id = req.params["assignmentId"] as string;
    if (!assignment_id)
      throw new ErrorResponse(400, "assignmentId is required");

    const assignment = await assignmentService.findAssignment({
      id: assignment_id,
    });
    if (!assignment) throw new ErrorResponse(404, "Assignment not found");

    const course = await courseService.findCourse({ id: assignment.course_id });
    if (!course) throw new ErrorResponse(404, "Course not found");

    if (course.instructor_id !== req.user.userId)
      throw new ErrorResponse(
        403,
        "You do not own the course this assignment belongs to",
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const instructorOwnsSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const submission_id = req.params["submissionId"] as string;
    if (!submission_id)
      throw new ErrorResponse(400, "submissionId is required");

    const submission = await submissionService.getSubmission(submission_id);
    if (!submission) throw new ErrorResponse(404, "Submission not found");

    const assignment = await assignmentService.findAssignment({
      id: submission.assignment_id,
    });
    if (!assignment) throw new ErrorResponse(404, "Assignment not found");

    const course = await courseService.findCourse({ id: assignment.course_id });
    if (!course) throw new ErrorResponse(404, "Course not found");

    if (course.instructor_id !== req.user.userId)
      throw new ErrorResponse(
        403,
        "You do not own the course this submission belongs to",
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const instructorOwnsCourseMaterial = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const material_id = req.params["materialId"] as string;
    if (!material_id) throw new ErrorResponse(400, "materialId is required");

    const material =
      await coursematerialService.findCourseMaterial(material_id);
    if (!material) throw new ErrorResponse(404, "Course material not found");

    const course = await courseService.findCourse({ id: material.course_id });
    if (!course) throw new ErrorResponse(404, "Course not found");

    if (course.instructor_id !== req.user.userId)
      throw new ErrorResponse(
        403,
        "You do not own the course this material belongs to",
      );

    next();
  } catch (error) {
    next(error);
  }
};
