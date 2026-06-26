import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { body, params } from "../../utils/validate.js";
import {
  ZAssignmentCreate,
  ZAssignmentParams,
  ZAssignmentUpdate,
  ZCourseParams,
} from "./assignment.types.js";
import {
  instructorOwns,
  InstructorOwnsAssignment,
  studentEnrolled,
} from "../../utils/scoping.js";
import assignmentService from "./assignment.service.js";
import { ResponseData, ResponseHandler } from "../../utils/response-handler.js";
import { Route } from "../../routes/route.types.js";

const router = Router();

router.post(
  "/",
  permissionHandler("manage-courses"),
  body(ZAssignmentCreate),
  instructorOwns,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignment = await assignmentService.createAssignment(req.body);
      res
        .status(201)
        .send(new ResponseHandler(new ResponseData(201, assignment)));
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/course/:courseId",
  params(ZCourseParams),
  studentEnrolled,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course_id = <string>req.params["courseId"];
      const assignment = await assignmentService.findAllAssignments({
        course_id,
      });
      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, assignment)));
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:assignmentId",
  permissionHandler("manage-courses"),
  params(ZAssignmentParams),
  body(ZAssignmentUpdate),
  InstructorOwnsAssignment,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignment_id = <string>req.params["assignmentId"];
      const response = await assignmentService.updateAssignment(
        assignment_id,
        req.body,
      );
      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, "Assignment Updated")));
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:assignmentId",
  permissionHandler("manage-courses"),
  params(ZAssignmentParams),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const assignment_id = <string>req.params["assignmentId"];
      const response = await assignmentService.deleteAssignment(assignment_id);
      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, "Assignment Deleted")));
    } catch (error) {
      next(error);
    }
  },
);

export default new Route("/assignment", router);
