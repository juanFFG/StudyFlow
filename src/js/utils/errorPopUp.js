// Funciones para el popup de error
export function showErrorPopup(message) {
    const popup = document.getElementById('errorPopup');
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.textContent = message;
    popup.classList.add('active');
    
    // Añadir clase para la animación
    setTimeout(() => {
        popup.querySelector('.popup-container').classList.add('popup-show');
    }, 10);
}

export function hideErrorPopup() {
    const popup = document.getElementById('errorPopup');
    const popupContainer = popup.querySelector('.popup-container');
    
    popupContainer.classList.remove('popup-show');
    
    // Esperar a que termine la animación antes de ocultar completamente
    setTimeout(() => {
        popup.classList.remove('active');
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closePopup");
    const confirmBtn = document.getElementById("confirmPopup");
    const popupOverlay = document.getElementById("errorPopup");

    closeBtn.addEventListener("click", hideErrorPopup);
    confirmBtn.addEventListener("click", hideErrorPopup);

    // Cerrar el popup si el usuario hace clic fuera de la caja
    popupOverlay.addEventListener("click", (event) => {
        if (event.target === popupOverlay) {
            hideErrorPopup();
        }
    });
});