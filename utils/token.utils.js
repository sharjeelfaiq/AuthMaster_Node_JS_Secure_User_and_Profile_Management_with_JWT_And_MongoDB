import jwt from 'jsonwebtoken';

export const setTokenCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};