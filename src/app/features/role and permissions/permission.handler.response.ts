import {
  ErrorResponse,
  ResponseData,
  ResponseHandler,
} from "../../utils/response-handler.js";

export const PERMISSION_HANDLER_RESPONSE: Record<
  "UNAUTHORIZED_ACCESS" | "PERMISSION_DOESNT_EXIST",
  ResponseHandler
> = {
  UNAUTHORIZED_ACCESS: new ResponseHandler(
    null,
    new ErrorResponse(404, "UNAUTHROIZED ACCESS"),
  ),
  PERMISSION_DOESNT_EXIST: new ResponseHandler(
    null,
    new ErrorResponse(400, "PERMISSION DOESNT EXIST"),
  ),
};
