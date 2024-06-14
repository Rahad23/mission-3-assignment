import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};
type TResponseLogin<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  token: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
const sendResponseLogin = <T>(res: Response, data: TResponseLogin<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    token: data.token,
  });
};

export const sendResponse_ = {
  sendResponse,
  sendResponseLogin,
};
