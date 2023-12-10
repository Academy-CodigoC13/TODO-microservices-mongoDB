const express = require("express");
const router = express.Router();
const axios = require("axios"); // Asegúrate de tener axios instalado

const MONGODB_SERVICE_URL = "http://localhost:3002/api"; // URL del servicio de MongoDB

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const response = await axios.get(`${MONGODB_SERVICE_URL}/tasks`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Agregar una nueva tarea
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  try {
    const response = await axios.post(`${MONGODB_SERVICE_URL}/tasks`, {
      title,
      description,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const response = await axios.delete(
      `${MONGODB_SERVICE_URL}/tasks/${taskId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// Marcar una tarea como completada
router.put("/tasks/:id/completed", async (req, res) => {
  const taskId = req.params.id;

  try {
    const response = await axios.put(
      `${MONGODB_SERVICE_URL}/tasks/${taskId}/completed`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error al marcar la tarea como completada" });
  }
});

module.exports = router;
