const Joi = require("joi");

const createOrderSchema = new Joi.object({
  orders: Joi.array().required().has({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
  userId: Joi.string().required(),
});


module.exports = { createOrderSchema };