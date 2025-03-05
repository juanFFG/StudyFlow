class Navigation {
    constructor() {
        this.views = [];
    }

    init() {
        this.views = [
            { name: "splash", ref: document.getElementById("splashScreen") },
            { name: "register", ref: document.getElementById("registerScreen") },
            { name: "login", ref: document.getElementById("loginScreen") },
            { name: "verHoy", ref: document.getElementById("verHoyScreen") },
            { name: "calendar", ref: document.getElementById("calendarScreen") },
            { name: "pomodoro", ref: document.getElementById("pomodoroScreen") }
        ];
    }

    navigateTo(viewName) {
        const view = this.views.find(v => v.name === viewName);
        if (!view) {
            console.error(`Vista "${viewName}" no encontrada.`);
            return;
        }

        // Ocultar todas las vistas
        this.views.forEach(v => v.ref.style.display = "none");

        // Mostrar la vista deseada
        view.ref.style.display = "block";
    }
}

// Exportar una instancia para que se use en toda la app
export const navigation = new Navigation();
