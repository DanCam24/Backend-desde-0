const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validarUsuario = require("../middlewares/validarUsuario");
const validarId = require("../middlewares/validarId");
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
const validarActualizacionUsuario = require("../middlewares/validarActualizacionUsuario");

router.get("/", auth, obtenerUsuarios);
router.get("/:id", auth, validarId, obtenerUsuarioPorId);
router.post("/", auth, validarUsuario, crearUsuario);
router.put(
  "/:id",
  auth,
  validarId,
  validarActualizacionUsuario,
  actualizarUsuario
);
router.delete("/:id", auth, validarId, eliminarUsuario);
// Operaciones bancarias
router.get("/:id/saldo", auth, validarId, consultarSaldo);
router.post("/:id/consignar", auth, validarId, validarConsignacion, consignar);
router.post("/:id/retirar", auth, validarId, validarRetiro, retirar);

module.exports = router;
