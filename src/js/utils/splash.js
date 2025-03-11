export function showRegisterScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const registerScreen = document.getElementById('registerScreen');

    //Arreglo de vistas
    const views = [
        { name: "splash", ref: document.getElementById("splashScreen") },
        { name: "register", ref: document.getElementById("registerScreen") },
        { name: "login", ref: document.getElementById("loginScreen") },
        { name: "today", ref: document.getElementById("todayScreen") },
        { name: "calendar", ref: document.getElementById("calendarScreen") },
        { name: "pomodoro", ref: document.getElementById("pomodoroScreen") }
    ];
    // Ocultar todas las vistas
    views.forEach(v => {
        if (v.ref) {
            v.ref.classList.add("inactive");
        } else {
            console.error(`Elemento no encontrado: ${v.name}`);
        }
    });

    setTimeout(() => {
        splashScreen.classList.add('hidden');
        registerScreen.classList.add('visible');
    }, 300);
}