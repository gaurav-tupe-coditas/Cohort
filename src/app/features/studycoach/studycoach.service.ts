import { generateText } from "ai"
import { buildStudentTools } from "./studycoach.tools.js"
import { google } from "@ai-sdk/google"

const SYSTEM_PROMPT = `You are the Study Coach for Cohort, a learning platform.
You help students stay organized and on track with their courses.
You have access to tools that let you look up their enrollments, assignments,
submissions.

Rules:
- You only ever act on behalf of the authenticated student. Never reference other students.
- When you take an action (enrol, submit), confirm what you did clearly.
- When you build a study plan, base it on real deadlines from getAssignmentsForCourse.
- If a tool returns an error, explain it in plain English and suggest what to do.`

 const chat = async(studentId:string,userMessage:string)=>{
    try {
        const tools = buildStudentTools(studentId)

        const {text} = await generateText({
            model:google('gemini-2.0-flash'),
            system:SYSTEM_PROMPT,
             prompt: userMessage,
             tools,
             maxRetries:4
        })
        return text
    } catch (error) {
        throw error
    }
}

export default {chat}