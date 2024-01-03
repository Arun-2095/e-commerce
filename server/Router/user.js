const {ErrorWrapper} = require('../Utils/errorWrapper');

const {UserController} = require('../Controller/user');

const Validator = require('../Middleware/validation');

const {userValidationSchema} = require("../Middleware/validation/user");


const userRoute = require('express').Router();

userRoute.get('/list', ErrorWrapper(UserController.getUser));

userRoute.post("/", Validator(userValidationSchema), ErrorWrapper(UserController.addUser));

userRoute.patch("/:userId", Validator(userValidationSchema), ErrorWrapper(UserController.updateUser));

userRoute.delete("/:userId", ErrorWrapper(UserController.deleteUser));

module.exports = {userRoute}