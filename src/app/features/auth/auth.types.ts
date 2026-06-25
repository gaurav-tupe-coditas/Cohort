import z, { email } from "zod";
import { ZUserRouterCreate } from "../user/user.types.js";

export const ZAuthRouterLogIn = z.object({
  email: z.email("Email should be in proper format"),
  password: z.string("Password should be string of length between 8 to 20").min(8).max(20),
});

export const ZAuthRouterSignUp = ZUserRouterCreate.omit({role_id:true});

export type AuthServiceLogIn = z.infer<typeof ZAuthRouterLogIn>;

export type AuthServiceSignUp = z.infer<typeof ZAuthRouterSignUp>;
