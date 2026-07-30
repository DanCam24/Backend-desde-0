const AppError = require("../errors/AppError");

function validarNombre(nombre) {
  if (typeof nombre !== "string") {
    throw new AppError(400, "El nombre debe ser texto", {
      campo: "nombre",
    });
  }
  if (nombre.trim().length < 3) {
    throw new AppError(422, "El nombre debe tener mínimo 3 caracteres", {
      campo: "nombre",
      minimo: 3,
    });
  }
}

function validarEmail(email) {
  if (typeof email !== "string") {
    throw new AppError(400, "El email debe ser texto", {
      campo: "email",
    });
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValido.test(email)) {
    throw new AppError(422, "El email no tiene un formato válido", {
      campo: "email",
      valor: email,
    });
  }
}

function validarTipoCuenta(tipoCuenta) {
  const tiposPermitidos = ["AHORROS", "CORRIENTE"];
  if (!tiposPermitidos.includes(tipoCuenta)) {
    throw new AppError(422, "Tipo de cuenta inválido", {
      permitidos: tiposPermitidos,
    });
  }
}

module.exports = {
  validarNombre,
  validarEmail,
  validarTipoCuenta,
};
