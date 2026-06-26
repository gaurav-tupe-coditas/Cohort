import announcementRoutes from "../features/announcement/announcement.routes.js";
import assignmentRoutes from "../features/assignment/assignment.routes.js";
import authRoute from "../features/auth/auth.route.js";
import courseRoutes from "../features/course/course.routes.js";
import courseenrollmentRoutes from "../features/courseenrollment/courseenrollment.routes.js";
import coursematerialRoutes from "../features/coursematerial/coursematerial.routes.js";
import studycoachRoutes from "../features/studycoach/studycoach.routes.js";
import submissionRoutes from "../features/submission/submission.routes.js";
import userRoute from "../features/user/user.route.js";
import type { Routes } from "./route.types.js";

export const ROUTES:Routes = [authRoute,userRoute,courseRoutes,courseenrollmentRoutes,coursematerialRoutes,assignmentRoutes,announcementRoutes,submissionRoutes,studycoachRoutes]