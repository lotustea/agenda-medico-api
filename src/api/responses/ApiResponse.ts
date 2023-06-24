import { Response } from 'express';

export class ApiResponse{
  static success(res: Response, data: any): void {
    if (data.error) {
      return this.error(res, data);
    }
    res.status(200).json({ status: 'success', data });
  }

  static error(res: Response, message: string | object, statusCode = 400): void {
    res.status(statusCode).json({ status: 'error', message });
  }
}
