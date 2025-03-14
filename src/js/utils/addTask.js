import { showErrorPopup, showSuccessPopup } from "./popUps";
import { loadTodayTasks } from "./loadTodayTasks"
document.addEventListener("DOMContentLoaded", function () {
    const addTaskForm = document.getElementById("add-task-form");
    const addTaskModal = document.getElementById("add-task-modal");
    const openModalBtn = document.getElementById("nav-add");
    const closeModalBtn = document.querySelector(".close-modal");
  
    // Mostrar el modal
    openModalBtn.addEventListener("click", () => {
      addTaskModal.style.display = "block";
    });
  
    // Cerrar el modal
    closeModalBtn.addEventListener("click", () => {
      addTaskModal.style.display = "none";
    });
  
    // Agregar tarea al array del usuario
    addTaskForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Obtener los valores del formulario
      const task = {
        id: Date.now(), // Generamos un ID único
        tipo: document.getElementById("task-type").value,
        asignatura: document.getElementById("task-subject").value,
        fecha: document.getElementById("task-date").value,
        hora: document.getElementById("task-time").value,
        valor: document.getElementById("task-value").value,
        comentario: document.getElementById("task-comment").value,
      };
  
      // Obtener usuario actual
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
      if (!currentUser) {
        showErrorPopup("No hay usuario autenticado.");
        return;
      }
  
      // Obtener tareas del usuario
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let userIndex = users.findIndex(user => user.username === currentUser.username);
  
      if (userIndex === -1) {
        showErrorPopup("Usuario no encontrado.");
        return;
      }
  
      // Si no tiene tareas, creamos el array
      users[userIndex].tasks = users[userIndex].tasks || [];
  
      // Agregar la nueva tarea
      users[userIndex].tasks.push(task);
  
      // Guardar en localStorage
      localStorage.setItem("users", JSON.stringify(users));
  
      // Cerrar el modal
      addTaskModal.style.display = "none";
  
      // Limpiar formulario
      addTaskForm.reset();
      loadTodayTasks();
      showSuccessPopup("Tarea agregada correctamente.");
    });
  });
  