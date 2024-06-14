import httpStatus from "http-status";
import AppError from "../../errors/app.error";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken, omitField } from "./auth.utils";
import config from "../../config";

const userLogin = async (payload: TLoginUser) => {
  const { email } = payload;
  const isUserExist = await User.isUserExistByEmail(email);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Exist!");
  }

  if (isUserExist?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User Already Deleted!");
  }

  if (!User.isPasswordIsMatch(payload?.password, isUserExist?.password)) {
    throw new AppError(httpStatus.FORBIDDEN, "Password Incorrect !");
  }

  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  //refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.JWT_REFRESH_TOKEN as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  //delete password this function
  const user = omitField(isUserExist.toObject(), ["password"]);

  return {
    accessToken,
    refreshToken,
    user: user,
  };
};

export const authService = {
  userLogin,
};
