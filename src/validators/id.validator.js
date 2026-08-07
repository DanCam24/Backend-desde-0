const AppError = require("../errors/AppError");

function validarId(id) {
  if (!Number.isInteger(Number(id))) {
    throw new AppError(400, "El id debe ser numérico", {
      campo: "id",
      valor: id,
    });
  }
}

module.exports = {
  validarId,
};
