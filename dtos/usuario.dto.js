function crearUsuarioDTO(data) {
  return {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
  };
}

function actualizarUsuarioDTO(data) {
  return {
    ...(data.nombre && { nombre: data.nombre }),
    ...(data.email && { email: data.email }),
  };
}

module.exports = {
  crearUsuarioDTO,
  actualizarUsuarioDTO,
};
