import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.base": "First name should be a type of text",
    "string.empty": "First name should not be empty",
    "string.min": "First name must be at least 2 characters long",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.base": "Last name should be a type of text",
    "string.empty": "Last name should not be empty",
    "string.min": "Last name must be at least 2 characters long",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Please provide a valid email address",
    "string.empty": "Email should not be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password should not be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("admin", "user", "student").required().messages({
    "string.base": "Role should be a type of text",
    "any.only": "Role must be either admin, user, or student",
    "any.required": "Role is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Please provide a valid email address",
    "string.empty": "Email should not be empty",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password should not be empty",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});
