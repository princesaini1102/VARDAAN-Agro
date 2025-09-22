import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  message: string,
  data?: any,
  pagination?: any,
  statusCode: number = 200
) => {
  const response: any = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

export const sendCreated = (
  res: Response,
  message: string,
  data?: any
) => {
  return sendSuccess(res, message, data, undefined, 201);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: any[]
) => {
  const response: any = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};