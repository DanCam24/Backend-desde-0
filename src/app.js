const express = require("express");
require("dotenv").config();

const usuariosRoutes = require("./routes/usuario.routes");
const movimientosRoutes = require("./routes/movimiento.routes");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/movimientos", movimientosRoutes);

app.use(errorHandler);

module.exports = app;