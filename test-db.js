const pool = require("./config/database");

async function probarConexion() {
  try {
    const resultado = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa:", resultado.rows);
  } catch (error) {
    console.error("Error conectando:", error.message);
  } finally {
    await pool.end();
  }
}

probarConexion();
