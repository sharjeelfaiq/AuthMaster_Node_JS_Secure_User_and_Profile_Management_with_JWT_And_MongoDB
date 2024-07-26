export const setTokenCookie = (res, token) => {
  return res.cookie("token", token, {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};