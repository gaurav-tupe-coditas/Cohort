import express from "express";
import { registerMiddlewares } from "./routes/route.js";
import { env } from "./utils/validate-env.js";
import { connectToPG } from "./connection/pg.connection.js";

export const StartServer = async() => {
  try {
    const app = express();
     await connectToPG()
    registerMiddlewares(app);
    app.listen(env.PORT, () => console.log(`App is listening on port ${env.PORT} `));
  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(1));
  }
};
