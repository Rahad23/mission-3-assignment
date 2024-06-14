import { ZodError } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = err.issues.map((issues) => {
    return {
      path: issues.path[issues.path.length - 1],
      message: issues.message,
      // errorSource: issues.path,
    };
  });

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleZodError;
