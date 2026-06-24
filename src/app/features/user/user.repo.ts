import type { UpdateOptions } from "sequelize";
import { UserSchmea } from "./user.schema.js";
import type { UserRepoCreateData, UserRepoFindOptions, UserRepoUpdateDataOptions } from "./user.types.js";

const create = (userData: UserRepoCreateData) => UserSchmea.create(userData);

const findOne = (UserFindOptions:UserRepoFindOptions) => UserSchmea.findOne(UserFindOptions);

const findAll = (UserFindOptions:UserRepoFindOptions) => UserSchmea.findAll(UserFindOptions);

const update = (UserUpdateDetails:UserRepoUpdateDataOptions,UserUpdateOptions:UpdateOptions) => UserSchmea.update(UserUpdateDetails,UserUpdateOptions);
const destroy = (UserFindOptions:UserRepoFindOptions) => UserSchmea.destroy(UserFindOptions);

export default {
  create,
  findOne,
  findAll,
  update,
  destroy,
};
