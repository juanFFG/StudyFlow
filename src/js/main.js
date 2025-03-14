import { showRegisterScreen } from './utils/splash.js';
import { registerUser } from './utils/register.js';
import { Navigation } from './data/Navigation.js';
import { showRegisterScreenL, showLoginScreenL } from './utils/easyNav.js';
import { loginUser } from './utils/logIn.js';
import { updateDateTime } from './utils/dateTime.js';
import { Pomodoro } from './data/Pomodoro.js';
import { showErrorPopup, showSuccessPopup } from './utils/popUps.js';
import { loadTodayTasks } from './utils/loadTodayTasks.js';
import { initializeCalendar } from './utils/calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation(
        ['splashScreen', 'registerScreen', 'loginScreen', 'dashboardScreen'], // Vistas principales
        ['today-view', 'calendar-view', 'pomodoro-view'] // Vistas dentro de dashboard
    );
    navigation.init();

    let logged = localStorage.getItem("loggedIn");
    let curView = localStorage.getItem("currentScreen") || "loginScreen";

    // Función para actualizar el estado activo de los botones
    function updateActiveButton(view) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === view) {
                btn.classList.add('active');
            }
        });
    }

    if (logged === "true") {
        if (curView === "splashScreen" || !curView) {
            console.log("Usuario logueado pero atrapado en splash. Corrigiendo...");
            curView = "today-view";
            localStorage.setItem("currentScreen", curView);
            loadTodayTasks();
        }

        console.log("📌 Navegando a:", curView);

        setTimeout(() => {
            navigation.showView(curView);
        }, 500);

        //Forzar escondido del splash
        setTimeout(() => {
            document.getElementById('splashScreen').classList.add('hidden');
        }, 1000);
    } else {
        console.log("Usuario no logueado");
        setTimeout(() => {
            showRegisterScreen();
        }, 2000);
    }

    // Inicializar la fecha y hora
    updateDateTime();
    setInterval(updateDateTime, 60000);

    const pomodoro = new Pomodoro();

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
    document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        await loginUser(username, password);
    });

    // Configurar enlaces para cambiar entre pantallas
    document.getElementById('showLoginLink')?.addEventListener('click', function (e) {
        e.preventDefault();
        showLoginScreenL();
    });

    document.getElementById('showRegisterLink')?.addEventListener('click', function (e) {
        e.preventDefault();
        showRegisterScreenL();
    });

    // Cerrar sesión
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("currentScreen", "loginScreen");
        localStorage.removeItem("currentUser");
        location.reload();
    });

    // --- VARIABLES DEL MODAL ---
    const addTaskBtn = document.getElementById("add-task-modal");
    const modal = document.getElementById("taskModal");
    const closeModalBtn = modal.querySelector(".close-modal");
    const cancelBtn = modal.querySelector(".cancel-btn");
    const addTaskForm = document.getElementById("add-task-form");

    // Función para mostrar el modal
    addTaskBtn.addEventListener("click", () => {
        modal.classList.add('active');
    });

    // Función para ocultar el modal
    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeModalBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);

    // Cerrar modal si se hace clic fuera de él
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // --- AGREGAR TAREA ---
    if (addTaskForm) {
        addTaskForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Obtener valores del formulario
            const tipo = document.getElementById("task-type").value.trim();
            const asignatura = document.getElementById("task-subject").value.trim();
            const fecha = document.getElementById("task-date").value.trim();
            const hora = document.getElementById("task-time").value.trim();
            const valor = document.getElementById("task-value").value.trim();
            const comentario = document.getElementById("task-comment").value.trim();

            // Validar que los campos no estén vacíos
            if (!tipo || !asignatura || !fecha || !hora || !valor) {
                showErrorPopup("Todos los campos obligatorios deben llenarse.");
                return;
            }

            const task = {
                id: Date.now(),
                tipo,
                asignatura,
                fecha,
                hora,
                valor,
                comentario,
            };

            // Obtener usuario actual
            let currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (!currentUser) {
                showErrorPopup("No hay usuario autenticado.");
                return;
            }

            // Obtener lista de usuarios
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let userIndex = users.findIndex(user => user.username === currentUser.username);

            if (userIndex === -1) {
                showErrorPopup("Usuario no encontrado.");
                return;
            }

            // Inicializar `tasks` si no existe
            users[userIndex].tasks = users[userIndex].tasks || [];

            // Agregar la tarea
            users[userIndex].tasks.push(task);

            // Guardar la lista de usuarios actualizada
            localStorage.setItem("users", JSON.stringify(users));

            // Actualizar currentUser en localStorage
            currentUser.tasks = users[userIndex].tasks;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            // Cerrar modal y limpiar formulario
            closeModal();
            addTaskForm.reset();

            // Actualizar la lista de tareas
            loadTodayTasks();
            showSuccessPopup("Tarea agregada correctamente.");

            // Si estamos en calendar-view, actualizar el calendario
            if (localStorage.getItem("currentScreen") === "calendar-view") {
                initializeCalendar();
            }
        });
    }

    // Escuchar cambios de vista en la navegación del dashboard
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const view = e.target.getAttribute('data-view');
            navigation.showView(view);
            localStorage.setItem("currentScreen", view);
            updateActiveButton(view);

            // Inicializar el calendario si se selecciona calendar-view
            if (view === 'calendar-view') {
                initializeCalendar();
            }
            // Puedes agregar más lógica para otras vistas si es necesario
            else if (view === 'today-view') {
                loadTodayTasks();
            }
        });
    });

});
