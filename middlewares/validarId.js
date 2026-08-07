const AppError = require("../errors/AppError");

function validarId(req, res, next) {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return next(
      new AppError(400, "El id debe ser numérico", {
        campo: "id",
        valor: id,
      })
    );
  }

  next();
}

module.exports = validarId;