const Joi = require("joi");

const variantSchema = Joi.object({
  quantity: Joi.number().required(),
  unit: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string(),
  color: Joi.string(),
});

const productSchema = Joi.object({
  products: Joi.array()
    .required()
    .has({
      name: Joi.string().required().min(3),
      description: Joi.string().min(10),
      categoryId:Joi.string().required(),
      variant: Joi.array()
        .items()
        .required()
        .has(variantSchema),
    }),
});


const categorySchema = Joi.object({
    categories: Joi.array()
      .required()
      .has({
        name: Joi.string().required().min(3),
        description: Joi.string().min(10)
    }),
});

const productRequestSchema = Joi.object({
    product:{
        name: Joi.string().required().min(3),
        description: Joi.string().min(10)
    },
});
  
module.exports = { productSchema , categorySchema , productRequestSchema , variantSchema};
