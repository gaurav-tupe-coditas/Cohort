import type { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodObject } from "zod";

const check =
  (type: "body" | "params" | "query") =>
  (schema: ZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[type]);
      if (!result.success) {
        return next({
          statusCode: 400,
          message: "BAD REQUEST",
          issues: result.error.issues,
          pretty: z.prettifyError(result.error),
          tree: z.treeifyError(result.error),
        });
      }
      req[type] = schema.parse(req[type]);

      next();
    } catch (e: any) {
      const error: any = {
        statusCode: 400,
        message: "BAD REQUEST",
        issues: e.issues,
      };
      next(error);
    }
  };

export const body = check("body");
export const query = check("query");
export const params = check("params");
