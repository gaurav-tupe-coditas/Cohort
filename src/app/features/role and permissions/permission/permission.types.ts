import type { Attributes, FindOptions, UpdateOptions } from "sequelize";
import type { PermissionSchema } from "./permission.schema.js";


export type PermissionRepoFindOptions = FindOptions<Attributes<PermissionSchema>>

export type PermissionRepoUpdateData = Omit<Attributes<PermissionSchema>,"id">