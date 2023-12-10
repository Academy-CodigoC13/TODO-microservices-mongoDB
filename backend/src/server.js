const express = require("express");
const tasksRouter = require("./routes/tasks");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors()); // Habilitar CORS

app.use(express.json());

// Configurar rutas
app.use("/api", tasksRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.info(`Servidor del backend iniciado en http://localhost:${PORT}`);
});
