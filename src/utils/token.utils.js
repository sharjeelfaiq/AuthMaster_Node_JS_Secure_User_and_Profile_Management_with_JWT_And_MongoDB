const setTokenCookie = (res, token) => {
  // eslint-disable-next-line no-undef
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "Strict",
  });
};

export default setTokenCookie;
