import { model, Schema } from "mongoose";
import { TUser, UserModelStatic } from "./user.interface";
import { userConstance } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: userConstance.Role_,
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//find user
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({
    email: email,
  }).select("+password");
};

//password match static function
userSchema.statics.isPasswordIsMatch = async function (
  TextPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(TextPassword, hashPassword);
};



userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});

export const User = model<TUser, UserModelStatic>("user", userSchema);
