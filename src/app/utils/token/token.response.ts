import {
  ErrorResponse,
  ResponseData,
  ResponseHandler,
} from "../../utils/response-handler.js";

export const TOKEN_RESPONSE: Record<
  | "NO_TOKEN_PROVIDED"
  |"USER_NOT_FOUND"
  
,
  ResponseHandler
> = {
  NO_TOKEN_PROVIDED: new ResponseHandler(
    null,
    new ErrorResponse(404, "NO AUTHENTICATION TOKEN PROVIDED"),
  ),
   USER_NOT_FOUND: new ResponseHandler(
    null,
    new ErrorResponse(404, "USER NOT FOUND"),
  ),
  
};
