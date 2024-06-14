import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import { ZodError } from "zod";
import handleZodError from "../errors/handle.zod.error";
import handleValidatorError from "../errors/handleValidatorError";
import handleCastError from "../errors/handle.cast.error";
import handleDuplicateIdError from "../errors/handle.duplicate.error";
import config from "../config";
import AppError from "../errors/app.error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "something want wrong";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "something want wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidatorError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateIdError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
    stack: config.NODE_ENV === "Development" ? err?.stack : null,
  });
};

export default errorHandler;
