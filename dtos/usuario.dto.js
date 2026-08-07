function crearUsuarioDTO(data) {
  return {
    nombre: data.nombre,
    email: data.email,
    tipoCuenta: data.tipoCuenta || "AHORROS",
  };
}

function actualizarUsuarioDTO(data) {
  return {
    ...(data.nombre !== undefined && { nombre: data.nombre }),
    ...(data.email !== undefined && { email: data.email }),
    ...(data.tipoCuenta !== undefined && { tipoCuenta: data.tipoCuenta }),
  };
}

module.exports = {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
};
