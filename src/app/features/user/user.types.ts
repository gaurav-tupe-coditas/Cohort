import { where, type Attributes, type FindOptions } from "sequelize";
import type { UserSchmea } from "./user.schema.js";
import z, { email } from "zod";

export type UserRepoFindOptions = FindOptions<
  Omit<Attributes<UserSchmea>, "password">
>;

export type UserRepoUpdateDataOptions = UserRepoCreateData;

export const ZUserObject = z.object({
  id: z.z.uuid(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_version: z.number(),
  role_id: z.uuid(),
});

export const ZUpdateDetailsObject = ZUserObject.omit({id:true,password_version:true})

export const ZUserRouterCreate = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role_id: z.uuid(),
});

export const orderby_values = z.union([
  z.literal("name"),
  z.literal("email"),
  z.literal("role_id"),
]);

export const ZFindAllUserData = z.object({
  where:ZUserObject.omit({password:true}).partial().default({}),
  limit: z.number().default(10),
  offset: z.number().default(0),
  order: orderby_values.optional(),
  group:orderby_values.optional()
});
export const ZFindUserData = ZUserObject.omit({password:true}).partial()
export type FindUserData = z.infer<typeof ZFindUserData>

export type FindAllUserData = z.infer<typeof ZFindAllUserData>
export type UserRepoCreateData = z.infer<typeof ZUserRouterCreate>;

export type UserRouterCreate = z.infer<typeof ZUserRouterCreate>;

export const ZUserRouterFindUser = z.object({
  id: z.uuid(),
});

export type UserServiceCreate = z.infer<typeof ZUserRouterCreate>;

export const ZUserUpdateObject = z.object({
  updateDetails:ZUpdateDetailsObject,
  findDetails:ZFindUserData
})

export type UserUpdateData = z.infer<typeof ZUserUpdateObject >