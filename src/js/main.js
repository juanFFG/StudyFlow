import { showRegisterScreen } from './utils/splash.js';
import { registerUser } from './utils/register.js';
import { Navigation } from './data/Navigation.js';
import { showRegisterScreenL, showLoginScreenL } from './utils/easyNav.js';
import { loginUser } from './utils/logIn.js';
import { updateDateTime } from './utils/dateTime.js';

document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation(
        ['splashScreen', 'registerScreen', 'loginScreen', 'dashboardScreen'], // Vistas principales
        ['today-view', 'calendarScreen', 'pomodoroScreen'] // Vistas dentro de dashboard
    );
    navigation.init();

    let logged = localStorage.getItem("loggedIn");
    let curView = localStorage.getItem("currentScreen") || "loginScreen";  

    if (logged === "true") {
        if (curView === "splashScreen" || !curView) {
            console.log("Usuario logueado pero atrapado en splash. Corrigiendo...");
            curView = "today-view";
            localStorage.setItem("currentScreen", curView);
        }
    
        console.log("📌 Navegando a:", curView);
    
        setTimeout(() => {
            navigation.showView(curView);
        }, 500);

        //Forzar escondido del splash
        setTimeout(() => {
            document.getElementById('splashScreen').classList.add('hidden');
        }, 1000);
    }else {
        console.log("Usuario no logueado");
        setTimeout(() => {
            showRegisterScreen();
        }, 2000);
    }

    // Inicializar la fecha y hora
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Manejar el formulario de registro
    const registerForm = document.getElementById("registerForm");
    registerForm?.addEventListener("submit", async function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        await registerUser(username, password, confirmPassword);
    });

    // Manejar el formulario de login
    document.getElementById("loginForm")?.addEventListener("submit", async function(event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;
    
        await loginUser(username, password);
    });

    // Configurar enlaces para cambiar entre pantallas
    document.getElementById('showLoginLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginScreenL();
    });

    document.getElementById('showRegisterLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterScreenL();
    });
});
