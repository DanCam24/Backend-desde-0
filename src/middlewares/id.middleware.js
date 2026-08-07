const { validarId } = require("../validators/id.validator");

function validarIdMiddleware(req, res, next) {
  try {
    validarId(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validarIdMiddleware;
