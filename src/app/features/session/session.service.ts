import { randomUUID } from "node:crypto";
import type { Question } from "./session.types.js";

const questions = new Map<string,Question[]>()

export const getQuestions = (courseId:string)=>questions.get(courseId) ?? []

export const addQuestion = (courseId:string,QuestionObj:Question)=>{
try {

    const exisitng = getQuestions(courseId)
    questions.set(courseId,[...exisitng,QuestionObj]);
} catch (error) {
    throw error
}
}

export const answerQuestion = (courseId:string,questionId:string,answer:string)=>{
    try {
        const courseQuestions = getQuestions(courseId)
        courseQuestions.forEach(question=>{
            if(question.id==questionId){
                question.answer = answer
                question.resolved=true
                return;
            }
        })
    } catch (error) {
        throw error
    }
}