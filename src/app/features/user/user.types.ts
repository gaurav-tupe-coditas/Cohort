import type { Attributes, FindOptions } from "sequelize";
import type { UserSchmea } from "./user.schema.js";
import z, { email } from "zod";

export type UserRepoFindOptions = FindOptions<
  Omit<Attributes<UserSchmea>, "password">
>;

export type UserRepoUpdateDataOptions = UserRepoCreateData;

export const ZUserRouterCreate = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role_id: z.uuid(),
});

export type UserRepoCreateData = z.infer<typeof ZUserRouterCreate>;

export type UserRouterCreate = z.infer<typeof ZUserRouterCreate>;

export const ZUserRouterFindUser = z.object({
  id: z.uuid(),
});

export type UserServiceCreate = z.infer<typeof ZUserRouterCreate>;
