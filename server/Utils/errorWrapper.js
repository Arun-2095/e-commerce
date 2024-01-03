function ErrorWrapper(controllerfn) {
  return function (req, res, next) {
    controllerfn(req, res, next)?.catch((err) => {
      next(err);
    });
  };
}

module.exports = { ErrorWrapper };
