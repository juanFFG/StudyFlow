// Función para actualizar la fecha y hora
export function updateDateTime() {
    const now = new Date();
    
    // Actualizar día
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    document.getElementById('currentDay').textContent = days[now.getDay()];
    
    // Actualizar fecha
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
                  'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = `${now.getDate()} ${months[now.getMonth()]}`;
    document.getElementById('currentDate').textContent = date;
    
    // Actualizar hora
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Si es 0, convertir a 12
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    document.getElementById('currentTime').textContent = timeStr;
}