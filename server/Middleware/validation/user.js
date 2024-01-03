const Joi = require("joi");

const addressSchema = new Joi.object({
  name: Joi.string().required().min(3),
  pincode: Joi.number().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
});

const userValidationSchema = new Joi.object({
  name: Joi.string().required().min(3),
  dob: Joi.date().required(),
  gender: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  address: Joi.array().required().has(addressSchema),
});

module.exports = { userValidationSchema };
