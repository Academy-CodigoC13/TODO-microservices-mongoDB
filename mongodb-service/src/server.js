// mongodb-service/src/server.js
const express = require("express");
const tasksRouter = require("./routes/tasks");
const db = require("../database");
const cors = require("cors");

const app = express();
const PORT = 3002; // Usamos un puerto diferente al del frontend y backend
app.use(cors());

app.use(express.json());

// Configura las rutas API
app.use("/api", tasksRouter);

// Configura el error handler para devolver un mensaje de error amigable al cliente cuando se produzca un error en el servidor de MongoDB
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

app.listen(PORT, () => {
  console.info(`Servidor de MongoDB iniciado en http://localhost:${PORT}`);
});
