import { TUser, TUserWithoutPassword } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (
  payload: TUser
): Promise<TUserWithoutPassword> => {
  const result = await User.create(payload);

  const { password, isDeleted, ...userWithoutPassword } = result.toObject();

  return userWithoutPassword;
};

export const userService = {
  createUserIntoDB,
};
