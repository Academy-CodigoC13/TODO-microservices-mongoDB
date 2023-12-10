const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Agregar una nueva tarea
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = await Task.create({ title, description });
    res.json({ message: "Tarea creada con éxito", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// Marcar una tarea como completada
router.put("/tasks/:id/completed", async (req, res) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true }
    );
    res.json({ message: "Tarea marcada como completada", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error al marcar la tarea como completada" });
  }
});

module.exports = router;
