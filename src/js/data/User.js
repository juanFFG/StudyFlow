import { Task } from "./Task.js";

export class User {
    constructor(username, hashedPassword) {
        this.username = username;
        this.password = hashedPassword; // Contraseña encriptada
        this.tasks = []; // Lista de tareas
    }

    // Agregar tarea
    addTask(title, type, dueDate, value, comment) {
        const newTask = new Task(title, type, dueDate, value, comment);
        this.tasks.push(newTask);
    }

    // Obtener tareas
    getTasks() {
        return this.tasks;
    }

    // Guardar en localStorage
    saveToLocalStorage() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }

    // Cargar usuario desde localStorage
    static loadFromLocalStorage(username) {
        const userData = localStorage.getItem(username);
        if (userData) {
            const parsedData = JSON.parse(userData);
            const user = new User(parsedData.username, parsedData.password);
    
            // Restaurar las tareas correctamente
            user.tasks = parsedData.tasks.map(
                task => new Task(task.type, task.subject, task.dueDate, task.value, task.comment)
            );
    
            return user;
        }
        return null;
    }

    //Renderizar tareas
    // Renderizar tareas en el contenedor
    renderTasks() {
        const taskList = document.querySelector(".task-list");
        if (!taskList) return; // Evita errores si no encuentra el contenedor

        taskList.innerHTML = ""; // Limpia antes de renderizar

        this.tasks.forEach((task) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            taskCard.innerHTML = `
            <h2 class="task-type">${task.type}</h2>
            <p class="task-subject">${task.subject}</p>
            <div class="task-details">
                <span class="task-comment">${task.comment}</span>
                <span class="task-time">${task.dueDate.split(" ")[1]}</span>
            </div>
            <div class="task-value">${task.value}%</div>
        `;

            taskList.appendChild(taskCard);
        });
    }

}