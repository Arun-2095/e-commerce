const { Types } = require("mongoose");
const { orderModel } = require("../Model/order");

const orderController = {};

orderController.getOrder = function (req, res) {
  // temporarly take user from params , realtime has to take from token
  const { userId } = req.params;

  console.log(userId, "userId");

  const id = new Types.ObjectId("659554368cf88f159897b231");
  orderModel
    .aggregate([
      { $unwind: "$products" },
      { $match: { userId: new Types.ObjectId(userId) } },
      // {$group: {
      //   product : '$products.productId'
      // }}
      {
        $lookup: {
          from: "products", 
          localField: "products.productId", 
          foreignField: "variant._id", 
          as: "prod", 
        },
      },
      { $unwind: "$prod" },
      { $unwind: "$prod.variant" },
      {
        $match: {
          $expr: {
            $eq: ["$prod.variant._id", "$products.productId"],
          },
        },
      },
      
      {
        $project: {
          _id: "$_id",
          products: {
            productId: "$products.productId",
            quantity: "$products.quantity",
            product_quantity: "$prod.variant.quantity",
            product_unit: "$prod.variant.unit",
            product_name: "$prod.name",
            price: "$prod.variant.price",
          },
          userId: "$userId",
          orderDate: "$orderDate",
        },
      },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: "$products",
          },
          
        },
      },
      
      // Additional stages can be added here if needed
    ])
    .then((orderList) => {
      res.status(200).json({ data: orderList });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

orderController.addOrder = function (req, res) {
  const { orders, userId } = req.body;

  console.log(orders, "orders");
  orderModel
    .create({ products: orders, userId })
    .then((orderData) => {
      res.status(201).json({ data: orderData });
    })
    .catch((err) => {
      res.status(401).send(new ErrorMessage(401, err.message, err));
    });
};

orderController.deleteOrder = function (req, res, next) {
  const { orderId } = req.params;

  userModel
    .deleteOne({ _id: orderId })
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

module.exports = { orderController };
