const express = require("express");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configurar rutas
app.use("/api", tasksRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor del backend iniciado en http://localhost:${PORT}`);
});
