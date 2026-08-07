const AppError = require("../errors/AppError");

function auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new AppError(401, "No autorizado. Debes enviar un token."));
  }
  const partes = authorization.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return next(new AppError(401, "Formato de token inválido."));
  }
  const token = partes[1];
  if (token !== "123456") {
    return next(new AppError(403, "Token inválido."));
  }
  next();
}

module.exports = auth;
