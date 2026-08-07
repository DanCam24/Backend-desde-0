const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validarUsuario = require("../middlewares/usuario.middleware");
const validarId = require("../middlewares/id.middleware");
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
const validarConsignacion = require("../middlewares/transaccion.middleware");
const validarActualizacionUsuario = require("../middlewares/actualizacionUsuario.middleware");

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
router.post("/:id/retirar", auth, validarId, validarConsignacion, retirar);

module.exports = router;
