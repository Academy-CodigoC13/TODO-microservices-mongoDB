// frontend/server.js
const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta 'public',
app.use(express.static(path.join(__dirname, "public")));

// Configuración para redirigir las solicitudes API al servidor backend
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

// Enviar el archivo 'index.html' para cualquier otra ruta
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.info(`Servidor del frontend iniciado en http://localhost:${PORT}`);
});
