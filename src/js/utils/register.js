import { User } from '../data/User.js';
import bcrypt from 'bcryptjs';
import { showErrorPopup, showSuccessPopup } from './popUps.js';
import { showLoginScreenL } from './easyNav.js';

// Registrar un nuevo usuario
export async function registerUser(username, password, confirmPassword) {
    if (!username || !password || !confirmPassword) {
        showErrorPopup("Por favor, completa todos los campos.");
        return;
    }

    if (password !== confirmPassword) {
        showErrorPopup("Las contraseñas no coinciden. Intenta de nuevo.");
        return;
    }

    // Obtener la lista de usuarios almacenados
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        showErrorPopup("El usuario ya existe. Intenta con otro.");
        return;
    }

    try {
        // Hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Crear el nuevo usuario
        const newUser = new User(username, hashedPassword);

        // Agregar el nuevo usuario al array
        users.push(newUser);

        // Guardar el array actualizado en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        showSuccessPopup("Registro exitoso. Ahora puedes iniciar sesión.");
        showLoginScreenL();

        

    } catch (error) {
        console.error("Error al registrar:", error);
        showErrorPopup("Ocurrió un error. Inténtalo de nuevo.");
    }
}
