import { ResponseHandler, ErrorResponse } from "../../../utils/response-handler.js";


export const ROLE_PERMISSION_RESPONSE: Record<
  | "INVALID_ROLE_OR_PERMISSION"
,
  ResponseHandler
> = {
  INVALID_ROLE_OR_PERMISSION: new ResponseHandler(
    null,
    new ErrorResponse(403, "INVALID ROLE OR PERMISSION"),
  )
};
