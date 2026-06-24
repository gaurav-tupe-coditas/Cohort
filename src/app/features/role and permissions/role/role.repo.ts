import type { Attributes, UpdateOptions } from "sequelize";
import { RoleSchema } from "./role.schema.js";
import type { RoleRepoFindOptions, RoleRepoUpdateData } from "./role.type.js";


const create = (name: string) =>
  RoleSchema.create({name});

const findOne = (RoleFindOptions: RoleRepoFindOptions) =>
  RoleSchema.findOne(RoleFindOptions);

const findAll = (RoleFindOptions: RoleRepoFindOptions) =>
  RoleSchema.findAll(RoleFindOptions);

const update = (
  UserUpdateDetails: RoleRepoUpdateData,
  UserUpdateOptions: UpdateOptions<Attributes<RoleSchema>>,
) => RoleSchema.update(UserUpdateDetails, UserUpdateOptions);
const destroy = (RoleFindOptions: RoleRepoFindOptions) =>
  RoleSchema.destroy(RoleFindOptions);

export default {
  create,
  findOne,
  findAll,
  update,
  destroy,
};
