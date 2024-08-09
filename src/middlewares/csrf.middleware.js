import csrf from "csurf";

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
});

export default csrfProtection;
