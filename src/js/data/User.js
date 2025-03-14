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
}