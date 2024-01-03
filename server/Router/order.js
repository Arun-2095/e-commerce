const {ErrorWrapper} = require('../Utils/errorWrapper');

const {orderController} = require('../Controller/order');

const Validator = require('../Middleware/validation');

const {createOrderSchema} = require("../Middleware/validation/order");


const orderRoute = require('express').Router();

orderRoute.get('/list/:userId', ErrorWrapper(orderController.getOrder));

orderRoute.post("/add", Validator(createOrderSchema), ErrorWrapper(orderController.addOrder));

// orderRoute.patch("/:userId", Validator(userValidationSchema), ErrorWrapper(UserController.updateUser));

// orderRoute.delete("/:userId", ErrorWrapper(UserController.deleteUser));

module.exports = {orderRoute}