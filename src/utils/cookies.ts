import { Response, CookieOptions } from "express";
import { env } from "../lib/env";

const defaultCookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "strict",
  secure: env.NODE_ENV === "production" ? true : false,
};

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  res.cookie(name, value, { ...defaultCookieOptions, ...options });
};
