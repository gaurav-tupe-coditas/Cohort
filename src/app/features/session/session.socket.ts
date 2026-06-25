//each course will have its own session , which will be initiated by the instructor,then student can join to that session, and on each event we will fire the requried queries
//a function which will create new session everytime it is requested

import { Server } from "node:http";
import {Server as SocketServer} from 'socket.io'
import type { Question } from "./session.types.js";
import { addQuestion, answerQuestion } from "./session.service.js";
export const SessionHandler = (server:Server)=>{
    const courseToSession = new Map<string,SocketServer>()

    const createSession = (courseId:string)=>{
        try {
            const newsession = new SocketServer(server)
            courseToSession.set(courseId,newsession)
            addSessionListeners(courseId,newsession)
            return "Session Created"
        } catch (error) {
            throw error
        }
    }
    const addSessionListeners = (courseId:string,session:SocketServer)=>{
        session.on('Connected',(socket)=>{
            console.log("User Connected")
        })
        session.on("question",(questionObj:Question)=>{
            addQuestion(courseId,questionObj)
        })
        session.on("answer",(questionId:string,answer:string)=>{
            answerQuestion(courseId,questionId,answer)
        })
    }
    const emitQuestion =(questionData:{courseId:string,questionObj:Question})=>{
        try {
            const session = courseToSession.get(questionData.courseId)
            if(!session)throw "No Session with this course"
            session.emit("question",questionData.questionObj)
        } catch (error) {
            throw error
        }
    }
    const emitAnswer = (courseId:string,questionId:string,answer:string)=>{
        try {
            const session = courseToSession.get(courseId)
            if(!session)throw "No Session with this course"
            session.emit("answer",{questionId,answer})
        } catch (error) {
            throw error
        }
    }
    return {
        createSession,courseToSession,emitAnswer,emitQuestion
    }

   

}
