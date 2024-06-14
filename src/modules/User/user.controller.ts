import catchAsync from "../../utils/catchAsync";
import { sendResponse_ } from "../../utils/sendResponse";

import { userConstance } from "./user.constant";
import { userService } from "./user.service";

const CreateUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  sendResponse_.sendResponse(res, {
    success: true,
    statusCode: userConstance.successCode,
    message: "User registered successfully !",
    data: result,
  });
});

export const userController = {
  CreateUser,
};
