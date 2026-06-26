import type { Attributes, FindOptions } from "sequelize";
import { CourseMaterialSchema } from "./coursematerial.schema.js";

const create = (data: {
  course_id: string;
  name: string;
  description: string;
  url: string;
}) => CourseMaterialSchema.create(data);

const findOne = (findOpts: FindOptions<Attributes<CourseMaterialSchema>>) =>
  CourseMaterialSchema.findOne(findOpts);

const findAll = (findOpts: FindOptions<Attributes<CourseMaterialSchema>>) =>
  CourseMaterialSchema.findAll(findOpts);

const destroy = (findOpts: FindOptions<Attributes<CourseMaterialSchema>>) =>
  CourseMaterialSchema.destroy(findOpts);

export default {
  create,
  findOne,
  findAll,
  destroy,
};
