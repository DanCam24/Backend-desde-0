function errorHandler(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;
  res.status(status).json({
    status,
    error: obtenerTipoError(status),
    message: error.message || "Error interno del servidor",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    details: error.details || null,
  });
}

function obtenerTipoError(status) {
  const errores = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    500: "Internal Server Error",
  };
  return errores[status] || "Error";
}

module.exports = errorHandler;
