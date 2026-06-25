import {
  json,
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import { ROUTES } from "./route.data.js";
import { ErrorResponse, ResponseHandler } from "../utils/response-handler.js";
import { tokenValidation } from "../utils/token/token.validation.js";
export const registerMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(json());

  app.use(cookieParser());

  app.use(tokenValidation)

  for (const route of ROUTES) {
    app.use(route.path, route.router);
  }
  app.use((err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.statusCode || 500)
      .send(new ResponseHandler(null, err.message));
  });
};
