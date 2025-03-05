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
export function showVerHoyScreenLT() {
    document.getElementById('loginScreen').classList.remove('visible');
    document.getElementById('todayScreen').classList.add('visible');
}