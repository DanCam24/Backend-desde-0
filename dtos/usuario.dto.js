function crearUsuarioDTO(data) {
  return {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
    tipoCuenta: data.tipoCuenta || "AHORROS",
    saldo: 0,
  };
}

function actualizarUsuarioDTO(data) {
  return {
    ...(data.nombre !== undefined && { nombre: data.nombre }),
    ...(data.email !== undefined && { email: data.email }),
    ...(data.tipoCuenta !== undefined && { tipoCuenta: data.tipoCuenta })
  };
}

module.exports = {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
};