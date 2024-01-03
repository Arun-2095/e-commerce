const {ProductModel} = require('../Model/product')

const productController = require('../Controller/product');

const Validator = require('../Middleware/validation');

const {productSchema , productRequestSchema} = require("../Middleware/validation/Product");


const ProductRouter = require('express').Router();



ProductRouter.get('/', productController.getProducts);

ProductRouter.post("/", Validator(productSchema), productController.addProducts );

ProductRouter.get("/:product",productController.getProduct);

ProductRouter.patch("/:product",Validator(productRequestSchema),productController.updateProduct);

ProductRouter.delete("/:product",productController.deleteProduct);

ProductRouter.post("/variant/:product",productController.addVariant);

ProductRouter.delete("/variant/:variantId",productController.deleteVariant);

module.exports = {ProductRouter}