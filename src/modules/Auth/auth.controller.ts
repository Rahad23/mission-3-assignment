import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.services";
import { sendResponse_ } from "../../utils/sendResponse";
import config from "../../config";

const authLogin = catchAsync(async (req, res) => {
  const result = await authService.userLogin(req.body);

  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse_.sendResponseLogin(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: user,
    token: accessToken,
  });
});

export const authController = {
  authLogin,
};
