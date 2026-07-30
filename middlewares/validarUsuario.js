const AppError = require("../errors/AppError");

function validarUsuario(req, res, next) {
  const { id, nombre, email } = req.body;
  if (id === undefined || nombre === undefined || email === undefined) {
    return next(
      new AppError(400, "Los campos id, nombre y email son obligatorios")
    );
  }
  if (!Number.isInteger(id)) {
    return next(
      new AppError(400, "El ID debe ser un número entero", {
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
  if (nombre.trim().length < 3) {
    return next(
      new AppError(422, "El nombre debe tener mínimo 3 caracteres", {
        campo: "nombre",
        minimo: 3,
      })
    );
  }
  if (typeof email !== "string") {
    return next(
      new AppError(400, "El email debe ser texto", {
        campo: "email",
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
