import z, { email } from "zod";
import { ZUserRouterCreate } from "../user/user.types.js";

export const ZAuthRouterLogIn = z.object({
  email: z.email(),
  password: z.string(),
});

export const ZAuthRouterSignUp = ZUserRouterCreate.omit({role_id:true});

export type AuthServiceLogIn = z.infer<typeof ZAuthRouterLogIn>;

export type AuthServiceSignUp = z.infer<typeof ZAuthRouterSignUp>;
