// src/utils/generateToken.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

type StringValue = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

export const generateToken = (
  payload: Record<string, any>,
  expiresIn?: string | number
): string => {
  const options: SignOptions = {
    expiresIn: (expiresIn || JWT_EXPIRES_IN) as unknown as StringValue,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
