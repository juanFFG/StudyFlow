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
  
  // Funciones para el popup de éxito
  export function showSuccessPopup(message) {
    const popup = document.getElementById('successPopup');
    const successMessage = document.getElementById('successMessage');
    
    successMessage.textContent = message;
    popup.classList.add('active');
    
    // Añadir clase para la animación
    setTimeout(() => {
      popup.querySelector('.popup-container').classList.add('popup-show');
    }, 10);
  }
  
  export function hideSuccessPopup() {
    const popup = document.getElementById('successPopup');
    const popupContainer = popup.querySelector('.popup-container');
    
    popupContainer.classList.remove('popup-show');
    
    // Esperar a que termine la animación antes de ocultar completamente
    setTimeout(() => {
      popup.classList.remove('active');
    }, 300);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const closeErrorBtn = document.getElementById("closeErrorPopup");
    const confirmErrorBtn = document.getElementById("confirmErrorPopup");
    const errorPopupOverlay = document.getElementById("errorPopup");
  
    closeErrorBtn.addEventListener("click", hideErrorPopup);
    confirmErrorBtn.addEventListener("click", hideErrorPopup);
  
    errorPopupOverlay.addEventListener("click", (event) => {
      if (event.target === errorPopupOverlay) {
        hideErrorPopup();
      }
    });
  
    const closeSuccessBtn = document.getElementById("closeSuccessPopup");
    const confirmSuccessBtn = document.getElementById("confirmSuccessPopup");
    const successPopupOverlay = document.getElementById("successPopup");
  
    closeSuccessBtn.addEventListener("click", hideSuccessPopup);
    confirmSuccessBtn.addEventListener("click", hideSuccessPopup);
  
    successPopupOverlay.addEventListener("click", (event) => {
      if (event.target === successPopupOverlay) {
        hideSuccessPopup();
      }
    });
  });
  