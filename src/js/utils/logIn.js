import bcrypt from 'bcryptjs';
import { showErrorPopup, showSuccessPopup } from './popUps.js';
import { showTodayScreenLT } from './easyNav.js';
import { loadTodayTasks } from './loadTodayTasks.js'

// Iniciar sesión
export async function loginUser(username, password) {
    if (!username || !password) {
        showErrorPopup("Por favor, completa todos los campos.");
        return;
    }

    // Obtener la lista de usuarios almacenados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario por su nombre
    const user = users.find(user => user.username === username);

    if (!user) {
        showErrorPopup("Usuario no encontrado.");
        return;
    }

    // Verificar la contraseña
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        showErrorPopup("Contraseña o usuario incorrectos.");
        return;
    }

    // Guardar el usuario autenticado en localStorage (para mantener sesión)
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("currentScreen", "today");
    localStorage.setItem("loggedIn", true);

    showSuccessPopup("Inicio de sesión exitoso.");
    loadTodayTasks();
    showTodayScreenLT();
}
