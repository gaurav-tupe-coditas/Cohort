import type { Attributes, FindOptions } from "sequelize";
import type { RolePermissionSchema } from "./rolepermission.schema.js";


export type RolePermissionRepoFindOptions = FindOptions<Attributes<RolePermissionSchema>>

export type RolePermissionRepoUpdateData = Omit<Attributes<RolePermissionSchema>,"id">