import { sendGradedNotification } from "../../utils/email.service.js";
import { ErrorResponse } from "../../utils/response-handler.js";
import assignmentService from "../assignment/assignment.service.js";
import userService from "../user/user.service.js";
import submissionRepo from "./submission.repo.js";
import type { SubmissionServiceCreate } from "./submission.types.js";

const submit = async (data: SubmissionServiceCreate) => {
  try {
    const assignment = await assignmentService.findAssignment({
      id: data.assignment_id,
    });
    if (!assignment) throw new ErrorResponse(404, "Assignment Not found");
    if (assignment.deadline && new Date() > assignment.deadline)
      throw new ErrorResponse(
        400,
        "Deadline has passed, submission has closed",
      );

    const exisiting = await submissionRepo.findOne({
      where: { student_id: data.student_id, assignment_id: data.assignment_id },
    });
    if (exisiting)
      throw new ErrorResponse(
        400,
        "You have already submitted for this assignment",
      );
    const result = await submissionRepo.create(data);

    return result;
  } catch (error) {
    throw error;
  }
};

const getSubmission = async (id: string, student_id?: string) => {
  try {
    const where: Record<string, string> = { id };
    if (student_id) {
      where["student_id"] = student_id;
    }

    const submission = await submissionRepo.findOne({ where });

    if (!submission) throw new ErrorResponse(404, "Submission not found");
    return submission;
  } catch (error) {
    throw error;
  }
};

const getSubmissionsForAssignment = async(assignment_id: string) => {
  try {
    const result = await submissionRepo.findAll({ where: { assignment_id } });
    return result;
  } catch (error) {
    throw error;
  }
};
const getMySubmissions = async(student_id: string) => {
  try {
    const result = await submissionRepo.findAll({ where: { student_id } });
    return result;
  } catch (error) {
    throw error;
  }
};

const grade = async (
  submissionId: string,
  updateData: Partial<{ grade: number; feedback: string }>,
) => {
  try {
    const submission = await getSubmission(submissionId)
    if(!submission)throw new ErrorResponse(404,"No submission exists")
         const assignement = await assignmentService.findAssignment({id:submission.assignment_id})
        if(!assignement)throw new ErrorResponse(404,"No Assigment's present ")
    const result = await submissionRepo.update(updateData, {
      where: { id: submissionId },
    });
   
    const student = await userService.findUser({id:submission.id})
    sendGradedNotification(student.email,student.name,assignement.name,updateData.grade,updateData.feedback)
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  submit,
  getSubmission,
  getSubmissionsForAssignment,
  getMySubmissions,
  grade,
};
