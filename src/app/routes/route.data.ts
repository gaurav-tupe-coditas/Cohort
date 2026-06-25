import authRoute from "../features/auth/auth.route.js";
import userRoute from "../features/user/user.route.js";
import type { Routes } from "./route.types.js";

export const ROUTES:Routes = [authRoute,userRoute]