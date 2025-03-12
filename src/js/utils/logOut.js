    //Función para cerrar sesión
export function logOut() {

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("currentScreen", "loginScreen");
        localStorage.removeItem("currentUser");
        location.reload();
    });
}
