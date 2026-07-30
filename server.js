const express = require("express");
const usuariosRoutes = require("./routes/usuarios.routes");
const movimientosRoutes = require("./routes/movimientos.routes");

const app = express();
const PORT = 3000;
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
// para correr node server.js
app.use("/usuarios", usuariosRoutes);

app.use("/movimientos", movimientosRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
