import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const omitField = (
  object: Record<string, unknown>,
  fields: string[],
) => {
  fields.forEach((field) => {
    delete object[field];
  });

  return object;
};