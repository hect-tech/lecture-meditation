import { ApiResponse, PaginationResponse } from '../interfaces/response.interface';

export class ResponseService {
  static success<T>(data?: T, message: string = 'Success'): ApiResponse<T> {
    return {
      code: 200,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static created<T>(data?: T, message: string = 'Resource created successfully'): ApiResponse<T> {
    return {
      code: 201,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static updated<T>(data?: T, message: string = 'Resource updated successfully'): ApiResponse<T> {
    return {
      code: 200,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static deleted(message: string = 'Resource deleted successfully'): ApiResponse {
    return {
      code: 200,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static notFound(message: string = 'Resource not found'): ApiResponse {
    return {
      code: 404,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static badRequest(message: string = 'Bad request'): ApiResponse {
    return {
      code: 400,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
    pagination: any,
    message: string = 'Success'
  ): PaginationResponse<T> {
    return {
      code: 200,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    };
  }
}
