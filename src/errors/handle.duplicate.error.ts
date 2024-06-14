import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateIdError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${
        err.keyValue.email
          ? err.keyValue.email
          : err.keyValue.name && err.keyValue.name
      } is already exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: err.errmsg,
    errorSources,
  };
};

export default handleDuplicateIdError;
