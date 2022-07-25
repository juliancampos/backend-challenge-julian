import { HttpException, HttpStatus } from "@nestjs/common";

export class AdapterResponse {
  constructor() {}

  sendException(errorMessage: string, statusCode?: HttpStatus, detail?: string) {
    throw new HttpException({
      status: statusCode || HttpStatus.BAD_REQUEST,
      message: errorMessage,
      detail
    }, statusCode);
  }
}