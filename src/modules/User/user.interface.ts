import { HydratedDocument, Model } from "mongoose";

export type TRole = "admin" | "user";

export type TUser = {
  name: string;
  email: string;
  role: TRole;
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
};

export interface UserModelStatic extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<HydratedDocument<TUser>>;
  isPasswordIsMatch(password: string, hashPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number
  ): boolean;
}

export type TUserWithoutPassword = Omit<TUser, "password" | "isDeleted">;
