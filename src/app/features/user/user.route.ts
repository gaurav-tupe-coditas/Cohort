import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { Route } from "../../routes/route.types.js";
import { permissionHandler } from "../role and permissions/permission.handler.js";
import { body, params } from "../../utils/validate.js";
import {
  ZFindAllUserData,
  ZUserRouterCreate,
  ZUserRouterFindUser,
  ZUserUpdateObject,
} from "./user.types.js";
import userService from "./user.service.js";
import {
  ErrorResponse,
  ResponseData,
  ResponseHandler,
} from "../../utils/response-handler.js";

const router = Router();

router.get(
  "/:id",
  params(ZUserRouterFindUser),
  permissionHandler("find-user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      let response = (await userService.findUser({ id }))?.toSafeJson();

      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, response)));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/all",
  body(ZFindAllUserData),
  permissionHandler("find-user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let response = await userService.findAllUser(req.body);
      const safeResponse =response.map((res) => res.toSafeJson());

      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, safeResponse)));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  body(ZUserRouterCreate),
  permissionHandler("create-user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await userService.createUser(req.body);
      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, "User Created")));
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  params(ZUserRouterFindUser),
  permissionHandler("delete-user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await userService.deleteUser(id);
      res
        .status(200)
        .send(new ResponseHandler(new ResponseData(200, "User deleted")));
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/",
  body(ZUserUpdateObject),
  permissionHandler("update-user"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.updateUser(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
);

export default new Route("/user", router);
