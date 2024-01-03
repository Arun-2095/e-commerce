
const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

module.exports =  (schema) =>   (req, res, next) => {
    const {
      error
    } = schema.validate(req.body, options);

    console.log("coming", req.body)
    if (error) {
      res.status(422)
        .send({errorMessage:error.details[0].message});
    } else {
      next();
    }
  };