const Express = require('express');
require("../server/Services/Db");
require("./Services/errorHandler");
const {ProductRouter }= require('./Router/product');
const {categoryRoute} = require('./Router/category');
const App = Express();

App.use(Express.json());

App.get("/healthcheck", (req,res)=>{
    res.send("ok")
})

App.use('/product', ProductRouter);

App.use('/categories', categoryRoute);

App.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

App.listen(2222, ()=> {

    console.log("server listening on port " + 2222);
})