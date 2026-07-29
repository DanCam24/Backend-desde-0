const AppError = require("../errors/AppError");

function validarUsuario(req, res, next) {
  const { id, nombre, email } = req.body;
  if (!id || !nombre || !email) {
    return next(
      new AppError(400, "Los campos id, nombre y email son obligatorios")
    );
  }
  if (typeof id !== "number") {
    return next(
      new AppError(400, "El ID debe ser un número", {
        campo: "id",
      })
    );
  }
  if (typeof nombre !== "string") {
    return next(
      new AppError(400, "El nombre debe ser texto", {
        campo: "nombre",
      })
    );
  }
  if (nombre.length < 3) {
    return next(
      new AppError(422, "El nombre debe tener mínimo 3 caracteres", {
        minimo: 3,
      })
    );
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    return next(
      new AppError(422, "El email no tiene un formato válido", {
        campo: "email",
        valor: email,
      })
    );
  }
  next();
}

module.exports = validarUsuario;
