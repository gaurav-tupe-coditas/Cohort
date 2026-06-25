import { Router, type NextFunction, type Request, type Response } from "express";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { upload } from "../../utils/multer.js";
import { ZAssignmentParams, ZGrade, ZSubmisisonCreate, ZSubmissionParams } from "./submission.types.js";
import { body, params } from "../../utils/validate.js";
import { ErrorResponse, ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import submissionService from "./submission.service.js";
import { Route } from "../../routes/route.types.js";

const router = Router()

router.post("/",permissionHandler("submit-assginment"),upload.single("file"),body(ZSubmisisonCreate),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.file) throw new ErrorResponse(400,"Submission File not uploaded")
        const url = req.file.path
        const submission = await submissionService.submit({student_id:req.user.userId,assignment_id:req.body.assignment_id,url})
        res.status(201).send(new ResponseHandler(new ResponseData(201,submission)))
    } catch (error) {
        next(error)
    }
})

router.get("/my",permissionHandler("submit-assignment"),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const response = submissionService.getMySubmissions(req.user.userId)
        res.status(200).send(new ResponseHandler(new ResponseData(200,response)))
    } catch (error) {
        next(error)
    }
})


//Check wheteher the assignement is for the course the instructor is handling is remaining

router.get("/assignment/:assignmentId",permissionHandler("manage-courses"),params(ZAssignmentParams),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const assignment_id = <string>req.params["assignementId"]
        const response = submissionService.getSubmissionsForAssignment(assignment_id)
        res.status(200).send(new ResponseHandler(new ResponseData(200,response)))
    } catch (error) {
        next(error)
    }
})

//same here also a scoper is requiered to check whether the assignment is for the grade present 
router.patch("/:submissionId/grade",permissionHandler("manage-courses"),params(ZSubmissionParams),body(ZGrade),async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id = <string>req.params["submissionId"]
        const response = await submissionService.grade(id,req.body)
        res.status(200).send(new ResponseHandler(new ResponseData(200,"Graded")))
    } catch (error) {
        next(error)
    }
})

export default new Route("/submission",router)