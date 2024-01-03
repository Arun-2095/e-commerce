const { userModel } = require("../Model/user");

const UserController = {};

UserController.getUser = function (req, res, next) {
  userModel
    .find()
    .limit(10)
    .then((userList) => {
      res.status(200).json({ data: userList });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

UserController.addUser = function (req, res, next) {
  const { ...user } = req.body;

  userModel
    .create(user)
    .then((userData) => {
      res.status(201).json({ data: userData });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

UserController.updateUser = function (req, res, next) {
  const { userId } = req.params;

  const { name, dob } = req.body;

  userModel
    .updateOne(
      { _id: userId },
      {
        $set: {
          name,
          dob,
        },
      }
    )
    .then((updatedData) => {
      res.status(200).send({ data: updatedData });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

UserController.deleteUser = function (req, res, next) {
  const { userId } = req.params;

  userModel
    .deleteOne({ _id: userId })
    .then((deleteddData) => {
      const message =
        deleteddData.deletedCount > 0
          ? "record Deleted Successfully"
          : "no records available";

      res.status(200).send({ data: deleteddData, message });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

module.exports = { UserController };
