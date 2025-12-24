import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(
    message: string,
    data: T,
    statusCode = 200,
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static error(
    message: string,
    statusCode: number,
  ): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,
      data: null,
    };
  }
}
