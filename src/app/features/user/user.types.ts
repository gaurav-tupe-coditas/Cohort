import { where, type Attributes, type FindOptions } from "sequelize";
import type { UserSchmea } from "./user.schema.js";
import z, { email } from "zod";

export type UserRepoFindOptions = FindOptions<
  Omit<Attributes<UserSchmea>, "password">
>;

export type UserRepoUpdateDataOptions = Partial<UserRepoCreateData>;

export const ZUserObject = z.object({
  id: z.uuid("UUID should be in proper format"),
  name: z.string("Name must be string"),
  email: z.email("Email should be in proper format"),
  password: z.string("Password should be string of length between 8 to 20").min(8).max(20),
  password_version: z.number(),
  role_id: z.uuid("Valid UUID must be provided"),
});

export const ZUpdateDetailsObject = ZUserObject.omit({
  id: true,
  password_version: true,
}).partial();

export const ZUserRouterCreate = z.object({
  name: z.string("Name should be a valid string"),
 email: z.email("Email should be in proper format"),
  password: z.string("Password should be string of length between 8 to 20").min(8).max(20),
  role_id: z.uuid("Invalid role id"),
});

export const orderby_values = z.union([
  z.literal("name"),
  z.literal("email"),
  z.literal("role_id"),
]);

export const ZFindAllUserData = z.object({
  where: ZUserObject.omit({ password: true }).partial().default({}),
  limit: z.number("Limit should be a number").default(10),
  offset: z.number("Offset should be a number").default(0),
  order: orderby_values.optional(),
  group: orderby_values.optional(),
});
export const ZFindUserData = ZUserObject.omit({ password: true }).partial();
export type FindUserData = z.infer<typeof ZFindUserData>;

export type FindAllUserData = z.infer<typeof ZFindAllUserData>;
export type UserRepoCreateData = z.infer<typeof ZUserRouterCreate>;

export type UserRouterCreate = z.infer<typeof ZUserRouterCreate>;

export const ZUserRouterFindUser = z.object({
  id: z.uuid(),
});

export type UserServiceCreate = z.infer<typeof ZUserRouterCreate>;

export const ZUserUpdateObject = z.object({
  updateDetails: ZUpdateDetailsObject,
  findDetails: ZFindUserData,
});

export type UserUpdateData = z.infer<typeof ZUserUpdateObject>;
