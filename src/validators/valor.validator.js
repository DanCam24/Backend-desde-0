const AppError = require("../errors/AppError");

function validarValor(valor) {
    if (valor === undefined) {
        throw new AppError(400, "El campo valor es obligatorio");
    }

    if (typeof valor !== "number") {
        throw new AppError(400, "El valor debe ser un número");
    }

    if (!Number.isFinite(valor)) {
        throw new AppError(400, "El valor debe ser un número válido");
    }

    if (valor <= 0) {
        throw new AppError(422, "El valor debe ser mayor que cero");
    }
}

module.exports = {
    validarValor
};