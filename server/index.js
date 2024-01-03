const Express = require("express");
require("../server/Services/Db");
require("./Services/errorHandler");
const { ProductRouter } = require("./Router/product");
const { categoryRoute } = require("./Router/category");
const { userRoute } = require("./Router/user");
const { orderRoute } = require("./Router/order");

const App = Express();

App.use(Express.json());

App.get("/healthcheck", (req, res) => {
  res.send("ok");
});

App.use("/product", ProductRouter);

App.use("/categories", categoryRoute);

App.use("/user", userRoute);

App.use("/order", orderRoute)

App.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({messgae:"Something went wrong!", error : err?.message});
});

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log(err);
});

App.listen(2222, () => {
  console.log("server listening on port " + 2222);
});
