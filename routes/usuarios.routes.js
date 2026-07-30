const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validarUsuario = require("../middlewares/validarUsuario");
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  consultarSaldo,
  consignar,
  retirar,
} = require("../controllers/usuarios.controller");
const validarConsignacion = require("../middlewares/validarConsignacion");
const validarRetiro = require("../middlewares/validarRetiro");

router.get("/", auth, obtenerUsuarios);

router.get("/:id", auth, obtenerUsuarioPorId);

router.post("/", auth, validarUsuario, crearUsuario);

router.put("/:id", auth, actualizarUsuario);

router.delete("/:id", auth, eliminarUsuario);

// Operaciones bancarias

router.get("/:id/saldo", auth, consultarSaldo);

router.post("/:id/consignar", auth, validarConsignacion, consignar);

router.post("/:id/retirar", auth, validarRetiro, retirar);

module.exports = router;
