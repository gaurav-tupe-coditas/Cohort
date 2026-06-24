import type { NextFunction, Request, Response } from "express";

import userService from "../../features/user/user.service.js";
import jwtService from "./jwt.service.js";



export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let accessToken = req.cookies["accessToken"];

    if (!accessToken && req.headers.authorization?.startsWith("Bearer ")) {
      accessToken = req.headers.authorization.split(" ")[1];
    }
    if (!accessToken) throw "No Authentication token provided";

    const userpayload = jwtService.verifyAccessToken(accessToken);

    const user = await userService.findUser({ id: userpayload.userId });

    if (!user || user.password_version != userpayload.password_version)
      throw "User Not Found";

    req.user = userpayload;
    next();
  } catch (error) {
    throw error;
  }
};
