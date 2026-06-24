import type { Attributes, UpdateOptions } from "sequelize";
import { PermissionSchema } from "./permission.schema.js";
import type { PermissionRepoFindOptions, PermissionRepoUpdateData } from "./permission.types.js";



const create = (name: string) =>
  PermissionSchema.create({name});

const findOne = (PermissionFindOptions: PermissionRepoFindOptions) =>
  PermissionSchema.findOne(PermissionFindOptions);

const findAll = (PermissionFindOptions: PermissionRepoFindOptions) =>
  PermissionSchema.findAll(PermissionFindOptions);

const update = (
  UserUpdateDetails: PermissionRepoUpdateData,
  UserUpdateOptions: UpdateOptions<Attributes<PermissionSchema>>,
) => PermissionSchema.update(UserUpdateDetails, UserUpdateOptions);
const destroy = (PermissionFindOptions: PermissionRepoFindOptions) =>
  PermissionSchema.destroy(PermissionFindOptions);

export default {
  create,
  findOne,
  findAll,
  update,
  destroy,
};
