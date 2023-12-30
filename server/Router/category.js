
const categoryController = require('../Controller/category');

const Validator = require('../Middleware/validation');

const {categorySchema} = require("../Middleware/validation/Product");


const categoryRoute = require('express').Router();

categoryRoute.get('/', categoryController.getCategories);

categoryRoute.post("/", Validator(categorySchema), categoryController.addCategories);

module.exports = {categoryRoute}