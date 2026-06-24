import {
  ErrorResponse,
  ResponseData,
  ResponseHandler,
} from "../../utils/response-handler.js";

export const AUTH_RESPONSE: Record<
  | "INVALID_CREDENTIALS"
  | "LOGIN_SUCCESSFULL",
  ResponseHandler
> = {
  INVALID_CREDENTIALS: new ResponseHandler(
    null,
    new ErrorResponse(403, "INVALID_CREDENTIALS"),
  ),
  LOGIN_SUCCESSFULL:new ResponseHandler(new ResponseData(200,"LOGIN SUCCESSFULL"))
};
