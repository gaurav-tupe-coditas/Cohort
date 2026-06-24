import type { Attributes, FindOptions } from "sequelize";
import type { RoleSchema } from "./role.schema.js";

export type RoleRepoFindOptions = FindOptions<Attributes<RoleSchema>>

export type RoleRepoUpdateData = Omit<Attributes<RoleSchema>,"id">