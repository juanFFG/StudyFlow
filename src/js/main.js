import { showRegisterScreen } from './utils/splash.js';
import { registerUser } from './utils/register.js';
import { navigation } from "./data/Navigation.js";
import { showRegisterScreenL, showLoginScreenL } from './utils/easyNav.js';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showRegisterScreen, 3000);

    // Inicializar la navegación
    navigation.init();

    // Manejar el formulario de registro
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            await registerUser(username, password, confirmPassword);
        });
    }

    //manejar el formulario de login
    const loginForm = document.getElementById("loginForm");
    

    // Configurar enlaces para cambiar entre pantallas
    document.getElementById('showLoginLink').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginScreenL();
    });
    
    document.getElementById('showRegisterLink').addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterScreenL();
    });
});

