import { User } from '../data/User.js';
import { Task } from '../data/Task.js';

export function loadAndRenderTasks() {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
        const currentUser = new User(storedUser.username, storedUser.password);
        currentUser.tasks = storedUser.tasks.map(
            task => new Task(task.type, task.subject, task.dueDate, task.value, task.comment)
        );

        if (document.querySelector(".task-list")) {
            currentUser.renderTasks();
        }
    }
}
