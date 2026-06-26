import { tool } from "ai"
import z from "zod"
import courseenrollmentService from "../courseenrollment/courseenrollment.service.js"
import assignmentService from "../assignment/assignment.service.js"
import { error } from "node:console"
import submissionService from "../submission/submission.service.js"
import courseService from "../course/course.service.js"

export const buildStudentTools:any = (studentId:string)=>({

    getMyEnrollments:tool({
        description:"Lists all the courses the student is enrolled in",
        inputSchema:z.object({}),
        execute:async()=>{
            const enrollments = await courseenrollmentService.findAllEnrollments({student_id:studentId})
            return enrollments
        }
    }),

    getAssignmentsForCourse:tool({
        description:"Lists all assignments for a specific course the student is enrolled in",
        inputSchema:z.object({course_id:z.uuid()}),
        execute:async({course_id})=>{
            const enrollment = courseenrollmentService.findEnrollment({student_id:studentId,course_id:course_id})
            if(!enrollment){
                return {error:"You are not enrolled in this course"}
            }
            const assignement = assignmentService.findAllAssignments({course_id:course_id})
            return assignement
        }

    }),

    getMySubmissions:tool({
        description:"List all the submissions student has made, including grades and feedback",
        inputSchema:z.object({}),
        execute:async()=>{
            return submissionService.getMySubmissions(studentId)
        }
    }),
    enrollInCourse:tool({
        description:"Enrolls the student in a course",
        inputSchema:z.object({courseId:z.uuid()}),
        execute:async({courseId})=>{
            const course = courseService.findCourse({id:courseId})
            if(!course)return {error:"No such course exist"
            }
            return courseenrollmentService.enroll(studentId,courseId)
        }
    })

})