import express from "express";
import { createServer } from "node:http";
import { connectToPG } from "./connection/pg.connection.js";
import { registerMiddlewares } from "./routes/route.js";
import { env } from "./utils/validate-env.js";
import { SessionHandler } from "./features/session/session.socket.js";

export const StartServer = async () => {
  try {
    const app = express();
    const server = createServer(app);
    SessionHandler(server);
    await connectToPG();
    registerMiddlewares(app);
    server.listen(env.PORT, () =>
      console.log(`App is listening on port ${env.PORT} `),
    );
  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(1));
  }
};
