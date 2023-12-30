const { CategoryModel } = require("../Model/category");

const categroyController = {};

categroyController.getCategories = function (req, res, next) {
  try {
     CategoryModel.find()
      .then((categories) => {
        res.status(200).json({ data: categories });
      })
      .catch((err) => {
        res.status(401).send(new ErrorMessage(401, err.message, err));
      });
  } catch (err) {}
};

categroyController.addCategories = function (req, res, next) {
    const {categories }= req.body;
    try {
        CategoryModel.insertMany(categories, {ordered: false, lean: true })
        .then((category) => {
          res.status(200).json({ data: category });
        })
        .catch((err) => {
          res.status(401).send(new ErrorMessage(401, err.message, err));
        });
    } catch (err) {
      next(err);
    }
  };

  
module.exports = categroyController