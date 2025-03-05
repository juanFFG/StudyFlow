import { User } from '../data/User.js';
import bcrypt from 'bcryptjs';
import { showErrorPopup } from './errorPopUp.js';

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
        const newUser = {
            username,
            password: hashedPassword,
            tasks: [] // Arreglo vacío de tareas por defecto
        };

        // Agregar el nuevo usuario al array
        users.push(newUser);

        // Guardar el array actualizado en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        //Cambiar vista a todayScreen
        const registerScreen = document.getElementById('registerScreen');
        const todayScreen = document.getElementById('todayScreen');

        registerScreen.style.display = 'none';
        todayScreen.style.display = 'flex';

    } catch (error) {
        console.error("Error al registrar:", error);
        showErrorPopup("Ocurrió un error. Inténtalo de nuevo.");
    }
}
