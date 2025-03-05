export function toggleTheme() {
    const body = document.body;
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    if (!moonIcon || !sunIcon) return; // Evita errores si los elementos no existen

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }

    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

export function loadThemePreference() {
    document.addEventListener('DOMContentLoaded', () => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const body = document.body;
        const moonIcon = document.querySelector('.moon-icon');
        const sunIcon = document.querySelector('.sun-icon');

        if (!moonIcon || !sunIcon) return; // Evita errores si los elementos no existen

        if (darkMode) {
            body.classList.add('dark-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            body.classList.remove('dark-mode');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });
}
