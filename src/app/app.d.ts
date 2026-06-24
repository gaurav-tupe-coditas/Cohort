import type { userLocalData } from "./utils/token/token.types.ts";

declare module "express-serve-static-core" {
  interface Request {
    user?: userLocalData;
  }
}

export {};
