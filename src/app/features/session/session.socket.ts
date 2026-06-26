import { randomUUID } from "node:crypto";
import { Server } from "node:http";
import { Server as SocketServer } from "socket.io";
import {
  addQuestion,
  answerQuestion,
  getQuestions,
} from "./session.service.js";
import type { Question } from "./session.types.js";
import {
  authenticateInstructor,
  authenticateStudent,
} from "./session.authenticate.js";

export const SessionHandler = (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const activeSessions = new Set<string>();

  io.on("connection", (socket) => {
    console.log(`Socket connected :${socket.id}`);

    socket.on(
      "create-room",
      async ({
        courseId,
        accessToken,
      }: {
        courseId: string;
        accessToken: string;
      }) => {
        try {
          if (!courseId) {
            socket.emit("error", {
              message: "courseId is required to create a room",
            });
            return;
          }
          const validUser = await authenticateInstructor(accessToken, courseId);
          if (!validUser) {
            socket.emit("error", {
              message:
                "You don't have permissions to create rooms for this course",
            });
            socket.disconnect(true)
            return 
          }
          activeSessions.add(courseId);
          socket.join(courseId);
          console.log(
            `Instructor room session created for course: ${courseId}`,
          );

          socket.emit("room-created", {
            courseId,
            message: "Room session created successfully",
          });
          socket.emit("question-list", getQuestions(courseId));
        } catch (error: any) {
          socket.emit("error", { message: error.message || error });
        }
      },
    );

    socket.on(
      "join-room",
      async ({
        courseId,
        accessToken,
      }: {
        courseId: string;
        accessToken: string;
      }) => {
        try {
          if (!courseId) {
            socket.emit("error", {
              message: "Course Id is required to join a room",
            });
            return;
          }

          if (!activeSessions.has(courseId)) {
            socket.emit("error", {
              message: "No active session going for this course",
            });
            return
          }
          const validUser = await authenticateStudent(accessToken, courseId);
          if (!validUser) {
            socket.emit("error", {
              message: "You are not enrolled in this course",
            });
            socket.disconnect(true)
            return
          }
          socket.join(courseId);
          console.log(`Socket ${socket.id} joined room: ${courseId}`);

          socket.emit("room-joined", {
            courseId,
            message: "Joined room successfully",
          });
          socket.emit("question-list", getQuestions(courseId));
        } catch (error: any) {
          socket.emit("error", { message: error.message || error });
        }
      },
    );
    socket.on(
      "ask-question",
      ({
        courseId,
        askedBy,
        askedByName,
        text,
      }: {
        courseId: string;
        askedBy: string;
        askedByName: string;
        text: string;
      }) => {
        try {
          if (!courseId || !text || !askedBy || !askedByName) {
            socket.emit("error", {
              message: "Missing required fields to ask a question",
            });
            return;
          }
          const questionObj: Question = {
            id: randomUUID(),
            courseId,
            askedBy,
            askedByName,
            text,
            answer: null,
            resolved: false,
          };

          addQuestion(courseId, questionObj);

          io.to(courseId).emit("new-question", questionObj);
          console.log(
            `New question asked in room ${courseId} by ${askedByName}: ${text}`,
          );
        } catch (error: any) {
          socket.emit("error", { message: error.message || error });
        }
      },
    );
    socket.on(
      "answer-question",
      ({
        courseId,
        questionId,
        answer,
      }: {
        courseId: string;
        questionId: string;
        answer: string;
      }) => {
        try {
          if (!courseId || !questionId || !answer) {
            socket.emit("error", {
              message: "Missing required fields to answer a question",
            });
            return;
          }
          answerQuestion(courseId, questionId, answer);
          io.to(courseId).emit("question-answered", {
            questionId,
            answer,
          });
          console.log(
            `Question ${questionId} answered in room ${courseId}: ${answer}`,
          );
        } catch (error: any) {
          socket.emit("error", { message: error.message || error });
        }
      },
    );
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      return
    });
  });
  return io;
};
