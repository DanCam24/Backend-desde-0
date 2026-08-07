function obtenerTipoError(status) {
  if (status >= 500) return "Internal Server Error";
  if (status >= 400) return "Client Error";
  return "Success";
}

function errorHandler(error, req, res, next) {
  if (error.code === "23505") {
    return res.status(409).json({
      status: 409,
      error: "Conflict",
      message: "El registro ya existe",
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }
  const status = error.status || 500;
  res.status(status).json({
    status,
    error: obtenerTipoError(status),
    message: error.message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    details: error.details || null,
  });
}

module.exports = errorHandler;
