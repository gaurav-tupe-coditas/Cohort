import { env } from "./validate-env.js";
import { sqsClient } from "../connection/sqs.connection.js";

import { SendMessageCommand } from "@aws-sdk/client-sqs";

export const sendNewAssignmentNotification = async (
  studentEmail: string,
  studentName: string,
  courseName: string,
  assignmentName: string,
  deadline?: Date,
) => {
  try {
    const deadlineText = deadline
      ? `<p>Deadline: <strong>${deadline.toLocaleString()}</strong></p>`
      : "";
    const subject = `New assignment in ${courseName}: ${assignmentName}`;
    const body = `
      <h2>New Assignment Posted</h2>
      <p>Hi ${studentName},</p>
      <p>A new assignment <strong>${assignmentName}</strong> has been posted in <strong>${courseName}</strong>.</p>
      ${deadlineText}
      <p>Log in to Cohort to view and submit your work.</p>
    `;
    const message = { to_email: studentEmail, subject, body };
    sendToSQS(message);
  } catch (error) {
    throw error;
  }
};

export const sendEnrollmentNotification = async (
  studentEmail: string,
  studentName: string,
  courseName: string,
) => {
  try {
    const subject = `You're enrolled in ${courseName}`;
    const body = `
      <h2>Welcome, ${studentName}!</h2>
      <p>You have been successfully enrolled in <strong>${courseName}</strong>.</p>
      <p>Log in to Cohort to view your course materials.</p>
    `;
    const message = { to_email: studentEmail, subject, body };
    sendToSQS(message);
  } catch (error) {
    throw error;
  }
};

export const sendGradedNotification = async (
  studentEmail: string,
  studentName: string,
  assignmentName: string,
  grade?: number,
  feedback?: string,
) => {
  try {
    const subject = `Your submission for ${assignmentName} has been graded`;
    const body = `
      <h2>Submission Graded</h2>
      <p>Hi ${studentName},</p>
      <p>Your submission for <strong>${assignmentName}</strong> has been graded.</p>
      <p>Grade: <strong>${grade}/100</strong></p>
      <p>Feedback: ${feedback}</p>
    `;

    const message = { to_email: studentEmail, subject, body };
    sendToSQS(message);
  } catch (error) {
    throw error;
  }
};

export const sendToSQS = async (messageBody: any) => {
  try {
    const command = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUEURL,
      MessageBody: JSON.stringify(messageBody),
    });

    await sqsClient.send(command);
  } catch (err) {
    throw err;
  }
};
