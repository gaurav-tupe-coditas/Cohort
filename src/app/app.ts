import express from "express";
import { registerMiddlewares } from "./routes/route.js";
import { env } from "./utils/validate-env.js";

export const StartServer = () => {
  try {
    const app = express();
    
    registerMiddlewares(app);
    app.listen(env.PORT, () => console.log(`App is listening on port ${env.PORT} `));
  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(1));
  }
};
