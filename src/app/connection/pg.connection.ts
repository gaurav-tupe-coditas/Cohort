import { Sequelize } from "sequelize";
import { env } from "../utils/validate-env.js";

export const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    dialect: "postgres",
    
  },
);

export const connectToPG = async () => {
  try {
    await sequelize.authenticate();

    console.log("CONNECTED TO PG SUCCESSFULLY");
  } catch (e) {
    console.log("COULD NOT CONNECT TO PG!");
    throw e;
  }
};
