export function showRegisterScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const registerScreen = document.getElementById('registerScreen');

    setTimeout(() => {
        splashScreen.classList.add('hidden');
        registerScreen.classList.add('visible');
    }, 300);
}