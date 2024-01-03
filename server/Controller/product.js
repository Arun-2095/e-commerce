const { ProductModel } = require("../Model/product");
const crypto = require("crypto");

const productController = {};

productController.getProducts = async function (req, res, next) {
  try {
    const productList = await ProductModel.find().limit(10);
    res.status(200).json({ data: productList });
  } catch (err) {
    next(err);
  }
};

productController.addProducts = function (req, res, next) {
  const { products } = req.body;
  try {
    ProductModel.insertMany(products, { ordered: false, lean: true })
      .then((productList) => {
        res.status(200).json({ data: productList });
      })
      .catch((err) => {
        res.status(401).send(new ErrorMessage(401, err.message, err));
      });
  } catch (err) {
    next(err);
  }
};

productController.getProduct = async function (req, res, next) {
  const { product } = req.params;
  try {
    const productList = await ProductModel.findOne({ _id: product });
    res.status(200).json({ data: productList });
  } catch (err) {
    next(err);
  }
};

productController.updateProduct = async function (req, res, next) {
  const { product } = req.params;
  const {
    product: { name, description },
  } = req.body;
  try {
    const product = await ProductModel.updateOne(
      { _id: product },
      {
        $set: {
          name,
          description,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

productController.deleteProduct = async function (req, res, next) {
  const { product } = req.params;
  
  try {
    const productDetails = await ProductModel.deleteOne(
      { _id: product }
    );
    res.status(200).json({ data: productDetails });
  } catch (err) {
    next(err);
  }
};

productController.addVariant = async function (req, res, next) {
  const { product } = req.params;

  const { variant } = req.body;

  console.log({ variant }, [variant], "variant");
  try {
    const productList = await ProductModel.updateOne(
      { _id: product },
      {
        $addToSet: {
          variant: { ...variant },
        },
      }
    );
    res.status(200).json({ data: productList });
  } catch (err) {
    next(err);
  }
};

productController.deleteVariant = async function (req, res, next) {
  const { variantId } = req.params;
  const { variantIds } = req.body;

  try {
    const productList = await ProductModel.updateOne(
      { "variant._id": variantId },
      {
        $pull: {
          variant: {
            _id: {
              $in: variantIds,
            },
          },
        },
      }
    );
    res.status(200).json({ data: productList });
  } catch (err) {
    next(err);
  }
};

module.exports = productController;
