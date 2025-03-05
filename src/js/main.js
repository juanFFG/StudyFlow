import { showRegisterScreen } from './utils/splash.js';
import { registerUser } from './utils/register.js';
import { navigation } from "./data/Navigation.js";

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
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

    document.getElementById("showLoginLink").addEventListener("click", (e) => {
        e.preventDefault();
        const registerScreen = document.getElementById("registerScreen");
        const loginScreen = document.getElementById("loginScreen");
        registerScreen.classList.add("hidden");
        loginScreen.style.display = "block";
    });

    document.getElementById("showRegisterLink").addEventListener("click", (e) => {
        e.preventDefault();
        const registerScreen = document.getElementById("registerScreen");
        const loginScreen = document.getElementById("loginScreen");
        loginScreen.style.display = "none";
        registerScreen.classList.remove("hidden");
    });
});

