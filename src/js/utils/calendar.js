// calendar.js
// Obtener elementos del DOM
const monthCurrent = document.querySelector('.month-current');
const monthBf = document.querySelector('#month-bf');
const monthAf = document.querySelector('#month-af');
const calendarList = document.querySelector('.calendar-list');

// Meses del año
const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Función para renderizar el calendario
function renderCalendar(month, year, tasks) {
    console.log(`Renderizando: ${months[month]} ${year} (currentMonth: ${month}, currentYear: ${year})`);
    monthCurrent.textContent = `${months[month]} ${year}`;
    calendarList.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const tasksForMonth = tasks.filter(task => {
        const taskDate = new Date(`${task.fecha}T${task.hora}`);
        return taskDate.getMonth() === month && taskDate.getFullYear() === year;
    });

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = date.toLocaleString('es-ES', { weekday: 'long' });
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');

        const dayInfo = document.createElement('div');
        dayInfo.classList.add('day-info');
        dayInfo.innerHTML = `
            <span class="day-name">${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</span>
            <span class="day-number">${day}</span>
        `;

        const dayTasks = document.createElement('div');
        dayTasks.classList.add('day-tasks');

        const tasksForDay = tasksForMonth.filter(task => {
            const taskDate = new Date(`${task.fecha}T${task.hora}`);
            return taskDate.getDate() === day;
        });

        if (tasksForDay.length > 0) {
            tasksForDay.forEach(task => {
                const taskColumn = document.createElement('div');
                taskColumn.classList.add('task-column');
                const taskDate = new Date(`${task.fecha}T${task.hora}`);
                const time = taskDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                taskColumn.innerHTML = `
                    <div class="task-time">${time}</div>
                    <div class="task-type">${task.tipo}</div>
                    <div class="task-subject">${task.asignatura}</div>
                    <div class="task-value">${task.valor}%</div>
                `;
                dayTasks.appendChild(taskColumn);
            });
        } else {
            const taskColumn = document.createElement('div');
            taskColumn.classList.add('task-column');
            taskColumn.innerHTML = `
                <div class="task-time">Todo el día</div>
                <div class="task-title">Sin tareas</div>
            `;
            dayTasks.appendChild(taskColumn);
        }

        dayCard.appendChild(dayInfo);
        dayCard.appendChild(dayTasks);
        calendarList.appendChild(dayCard);
    }
}

// Exportar la función principal para inicializar el calendario
export function initializeCalendar(month = new Date().getMonth(), year = new Date().getFullYear()) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.tasks) {
        console.error('Usuario no encontrado o sin tareas');
        return;
    }

    console.log(`Inicializando calendario: ${months[month]} ${month} ${year}`); // Depuración

    // Renderizar el calendario inicial con los parámetros proporcionados
    renderCalendar(month, year, currentUser.tasks);

    // Añadir event listeners para navegación con protección
    let lastClickTime = 0;
    const clickDelay = 300; // Evitar clics dobles accidentales (300ms)

    monthBf.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastClickTime < clickDelay) return;
        lastClickTime = now;

        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        console.log(`Navegando atrás a: ${months[month]} ${year} (month: ${month}, year: ${year})`);
        renderCalendar(month, year, currentUser.tasks);
    });

    monthAf.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastClickTime < clickDelay) return;
        lastClickTime = now;

        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        console.log(`Navegando adelante a: ${months[month]} ${year} (month: ${month}, year: ${year})`);
        renderCalendar(month, year, currentUser.tasks);
    });

    return { month, year }; // Devolver los valores actuales para persistencia
}