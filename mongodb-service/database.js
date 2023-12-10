const mongoose = require("mongoose");

// Conexión a la base de datos de MongoDB llamada "tododb" en el puerto 27017
mongoose.connect("mongodb://localhost:27017/tododb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a MongoDB");
});

module.exports = mongoose;
