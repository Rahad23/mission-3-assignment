import { NextFunction, Request, Response } from "express";
import { TRole } from "../modules/User/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/app.error";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/User/user.model";
const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const startsWithBearer = token.split(" ")[0];
    const jwtToken = token.split(" ")[1];

    if (startsWithBearer !== "Bearer") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid token format. Expected Bearer token."
      );
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      jwtToken,
      config.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
    }

    // // checking if the user is blocked
    // const userStatus = user?.status;

    // if (userStatus === "blocked") {
    //   throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
