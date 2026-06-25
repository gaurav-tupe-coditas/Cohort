import type { Request, Response, NextFunction } from "express";
import permissionService from "./permission/permission.service.js";
import rolepermissionService from "./rolepermission/rolepermission.service.js";
import { PERMISSION_HANDLER_RESPONSE } from "./permission.handler.response.js";

export const permissionHandler =
  (permissionName: string) =>
  async (req: Request, res: Response, next: NextFunction)  => {
    try {
     const permission = await permissionService.findPermission({name:permissionName})
     if(!permission)throw PERMISSION_HANDLER_RESPONSE.PERMISSION_DOESNT_EXIST.err
     const userHasPermission = await rolepermissionService.findOne({permission_id:permission.id,role_id:req.user.role_id})
     if(!userHasPermission) throw PERMISSION_HANDLER_RESPONSE.UNAUTHORIZED_ACCESS.err

     next()
    } catch (error) {
        next(error)
    }
  };
