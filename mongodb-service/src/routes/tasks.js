const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/task");

// Ruta para obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Ruta para crear una nueva tarea
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  // Validar que se proporcionó un título para la tarea
  if (!title) {
    return res
      .status(400)
      .json({ error: "El título de la tarea es obligatorio." });
  }
  try {
    const newTask = await Task.create({ title, description });
    res.json({ message: "Tarea creada exitosamente", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Ruta para eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res
      .status(400)
      .json({ error: "ID de tarea no proporcionado o formato invalido." });
  }

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Tarea eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea." });
  }
});

// Ruta para marcar una tarea como completada
router.put("/tasks/:id/completed", async (req, res) => {
  const taskId = req.params.id;

  if (!taskId) {
    return res.status(400).json({ error: "ID de tarea no proporcionado." });
  }

  try {
    await Task.findByIdAndUpdate(taskId, { completed: true });
    res.json({ message: "Tarea marcada como completada exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al marcar la tarea como completada." });
  }
});

module.exports = router;
