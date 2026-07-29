function auth(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      error: "No autorizado. Debes enviar un token.",
    });
  }
  const partes = authorization.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      error: "Formato de token inválido.",
    });
  }
  const token = partes[1];
  if (token !== "123456") {
    return res.status(403).json({
      error: "Token inválido.",
    });
  }
  // Guardamos información del usuario para los siguientes middlewares/controladores
  req.usuario = {
    id: 1,
    nombre: "Administrador",
  };
  next();
}

module.exports = auth;
