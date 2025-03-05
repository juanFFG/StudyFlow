import { showRegisterScreen } from './utils/splash.js';
import { registerUser } from './utils/register.js';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showRegisterScreen, 3000);

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
});

