// Función para mostrar la pantalla de login
export function showLoginScreenL() {
    document.getElementById('registerScreen').classList.remove('visible');
    document.getElementById('loginScreen').classList.add('visible');
}

// Función para mostrar la pantalla de registro
export function showRegisterScreenL() {
    document.getElementById('loginScreen').classList.remove('visible');
    document.getElementById('registerScreen').classList.add('visible');
}

// Función para mostrar la pantalla de ver hoy LT: Login-Today
export function showTodayScreenLT() {
    document.getElementById('loginScreen').classList.remove('visible');
    document.getElementById('dashboardScreen').classList.remove('inactive');
    document.getElementById('today-view').classList.remove('inactive');
}