import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "hm_admin";

const getAdminPassword = () => {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD environment variable is not set.");
  return password;
};

const sign = (value: string) => createHmac("sha256", getAdminPassword()).update(value).digest("hex");

const getToken = () => {
  const value = "admin";
  return `${value}.${sign(value)}`;
};

export const verifyAdminPassword = (password: string) => password === getAdminPassword();

export const setAdminCookie = () => {
  cookies().set(cookieName, getToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
};

export const clearAdminCookie = () => {
  cookies().delete(cookieName);
};

export const isAdminAuthenticated = () => {
  const token = cookies().get(cookieName)?.value;
  if (!token) {
    return false;
  }

  const [value, signature] = token.split(".");
  if (!value || !signature) {
    return false;
  }

  const expected = sign(value);
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};

