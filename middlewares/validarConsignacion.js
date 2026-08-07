const AppError = require("../errors/AppError");

function validarConsignacion(req, res, next) {
  const { valor } = req.body;
  if (valor === undefined) {
    return next(new AppError(400, "El campo valor es obligatorio"));
  }
  if (typeof valor !== "number") {
    return next(
      new AppError(400, "El valor debe ser un número", {
        campo: "valor",
      })
    );
  }
  if (!Number.isFinite(valor)) {
    return next(
      new AppError(400, "El valor debe ser un número válido", {
        campo: "valor",
      })
    );
  }
  if (valor <= 0) {
    return next(
      new AppError(422, "El valor debe ser mayor que cero", {
        campo: "valor",
        valor,
      })
    );
  }
  next();
}

module.exports = validarConsignacion;
