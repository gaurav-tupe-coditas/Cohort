import {
  ErrorResponse,
  ResponseData,
  ResponseHandler,
} from "../../utils/response-handler.js";

export const USER_RESPONSE: Record<
  | "USER_NOT_FOUND"
  | "USER_ALREADY_EXISTS"
  | "USER_CREATED"
  | "USER_NOT_CREATED"
  | "USER_UPDATED"
  | "USER_NOT_UPDATED"
  | "USER_DELETED"
  | "USER_NOT_DELETED"
,
  ResponseHandler
> = {
  USER_NOT_FOUND: new ResponseHandler(
    null,
    new ErrorResponse(404, "USER NOT FOUND"),
  ),
  USER_ALREADY_EXISTS: new ResponseHandler(
    null,
    new ErrorResponse(400, "USER ALREADY EXISTS"),
  ),
  USER_CREATED: new ResponseHandler(new ResponseData(201, "USER CREATED")),
  USER_NOT_CREATED: new ResponseHandler(
    null,
    new ErrorResponse(400, "USER NOT CREATED"),
  ),

  USER_UPDATED: new ResponseHandler(new ResponseData(200, "USER UPDATED")),
  USER_NOT_UPDATED: new ResponseHandler(
    null,
    new ErrorResponse(400, "USER NOT UPDATED"),
  ),
  USER_DELETED: new ResponseHandler(new ResponseData(200, "USER DELETED")),
  USER_NOT_DELETED: new ResponseHandler(
    null,
    new ErrorResponse(400, "USER NOT DELETED"),
  ),
  
};
