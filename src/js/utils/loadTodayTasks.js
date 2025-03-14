export function loadTodayTasks() {
    // Obtener usuario actual
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.tasks) {
        console.log("No hay usuario autenticado o no tiene tareas.");
        return;
    }

    // Obtener la fecha de hoy en formato "DD/MM/YYYY"
    const today = new Date();
    const todayFormatted = today.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    console.log("Fecha de hoy:", todayFormatted);
    console.log("Tareas guardadas:", currentUser.tasks);

    // Filtrar tareas para hoy asegurando el formato correcto
    const todayTasks = currentUser.tasks.filter(task => {
        let taskDate = task.fecha;

        // Convertir si está en "YYYY-MM-DD"
        if (taskDate.includes("-")) {
            let parts = taskDate.split("-");
            taskDate = `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
        }

        return taskDate === todayFormatted;
    });

    console.log("Tareas encontradas para hoy:", todayTasks);

    // Mostrar tareas o mensaje de "sin tareas"
    const taskListContainer = document.getElementById("task-list");
    taskListContainer.innerHTML = ""; // Limpiar antes de agregar

    if (todayTasks.length === 0) {
        taskListContainer.innerHTML = `
            <div class="task-card">
                <p class="task-subject">No tienes tareas para hoy.</p>
                <p class="task-comment">¿Que tal una sesión de estudio?</p>
            </div>
        `;
        return;
    }

    // Renderizar tareas
    todayTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        // Convertir hora a formato AM/PM
        const formattedTime = formatTimeAMPM(task.hora);

        taskItem.innerHTML = `
            <div class="task-card">
                <h2 class="task-type">${task.tipo}</h2>
                <p class="task-subject">${task.asignatura}</p>
                <div class="task-details">
                    <span class="task-comment">${task.comentario}</span>
                    <span class="task-time">${formattedTime}</span>
                </div>
                <div class="task-value">${task.valor}%</div>
            </div>
        `;
        taskListContainer.appendChild(taskItem);
    });
}

// Función para convertir la hora a AM/PM
function formatTimeAMPM(time) {
    let [hour, minute] = time.split(":").map(Number);
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convertir 0 a 12 para formato AM/PM
    return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}
// --- EJECUTAR AUTOMÁTICAMENTE AL CARGAR LA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    loadTodayTasks();
});
