import type { NextFunction, Request, Response } from "express";

import userService from "../../features/user/user.service.js";
import jwtService from "./jwt.service.js";
import { TOKEN_RESPONSE } from "./token.response.js";



export const tokenValidation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if(req.path.startsWith("/auth"))return next();
    let accessToken = req.cookies["accessToken"];

    if (!accessToken && req.headers.authorization?.startsWith("Bearer ")) {
      accessToken = req.headers.authorization.split(" ")[1];
    }
    if (!accessToken) throw  TOKEN_RESPONSE.NO_TOKEN_PROVIDED.err;

    const userpayload = jwtService.verifyAccessToken(accessToken);

    const user = await userService.findUser({ id: userpayload.userId });

    if (!user || user.password_version != userpayload.password_version)
      throw TOKEN_RESPONSE.USER_NOT_FOUND.err;

    req.user = userpayload;
    next();
  } catch (error) {
    next (error)
  }
};
