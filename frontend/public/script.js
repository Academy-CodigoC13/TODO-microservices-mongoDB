document.addEventListener("DOMContentLoaded", () => {
  const taskListContainer = document.getElementById("taskList");
  const addTaskForm = document.getElementById("addTaskForm");

  // Cargar tareas al cargar la página
  loadTasks();

  // Agregar evento al formulario para manejar la creación de nuevas tareas
  addTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto al hacer click en el botón de submit (que es un input de tipo submit) o al presionar enter en algún input del formulario (que es un input de tipo text)

    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;

    // Validar que se ingresó un título antes de agregar la tarea
    if (taskTitle.trim() !== "") {
      await addTask(taskTitle, taskDescription);
      loadTasks(); // Recargar la lista de tareas después de agregar una nueva tarea
      addTaskForm.reset(); // Limpiar el formulario
    } else {
      alert("Por favor, ingrese un título para la tarea.");
    }
  });

  // Delegar eventos de eliminación y completado a los botones correspondientes
  taskListContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-task-btn")) {
      const taskId = event.target.dataset.taskId;
      deleteTask(taskId);
    } else if (event.target.classList.contains("complete-task-btn")) {
      const taskId = event.target.dataset.taskId;
      markAsCompleted(taskId);
    }
  });

  // Función para cargar tareas desde el backend y mostrarlas en la interfaz
  async function loadTasks() {
    taskListContainer.innerHTML = ""; // Limpiar el contenedor antes de cargar las tareas
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (data.tasks) {
        data.tasks.forEach((task) => {
          const taskElement = createTaskElement(task);
          taskListContainer.appendChild(taskElement);
        });
      }
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  }

  // Función para agregar una nueva tarea al backend
  async function addTask(title, description) {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  }

  // Función para borrar una tarea
  async function deleteTask(id) {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      alert(data.message);

      // Recargar la lista de tareas después de borrar una tarea
      loadTasks();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  }

  // Función para marcar una tarea como completada
  async function markAsCompleted(id) {
    try {
      const response = await fetch(`/api/tasks/${id}/completed`, {
        method: "PUT",
      });

      const data = await response.json();
      alert(data.message);

      // Recargar la lista de tareas después de marcar una tarea como completada
      loadTasks();
    } catch (error) {
      console.error("Error al marcar la tarea como completada:", error);
    }
  }

  // Función para crear un elemento de tarea HTML
  function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || "Sin descripción"}</p>
      <button class="delete-task-btn" data-task-id="${
        task._id
      }">Eliminar</button>
      <button class="complete-task-btn" data-task-id="${
        task._id
      }">Marcar como completado</button>
    `;
    return taskElement;
  }
});
