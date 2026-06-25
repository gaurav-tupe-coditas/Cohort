export class ResponseHandler {
  constructor(
    public data: ResponseData | null,
    public err: any = ErrorResponse,
  ) {}
}

export class ErrorResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public issues?: Array<string> | null
  ) {}
}

export class ResponseData {
  constructor(
    public statusCode: number,
    public data: any,
  ) {}
}
