import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required()
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
        "string.pattern.base": "Name must contain only letters and spaces",
      }),

    email: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .messages({
        "string.pattern.base": "Email must be a valid email address",
      }),

    phonenumber: Joi.string()
      .length(10) 
      .pattern(/^[6-9][0-9]{9}$/) 
      .optional()
      .messages({
        "string.length": "Phone number must be exactly 10 digits",
        "string.pattern.base": "Phone number must start with 6-9 and contain only digits",
      }),

    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain at least one special character",
        "any.required": "Password is required",
      }),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
