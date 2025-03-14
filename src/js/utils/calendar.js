// calendar.js
// No necesitamos importar User.js porque usaremos los datos de localStorage directamente

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

// Fecha actual para inicializar
let currentDate = new Date();
let currentMonth = currentDate.getMonth(); // 0-11
let currentYear = currentDate.getFullYear();

// Función para renderizar el calendario
function renderCalendar(month, year, tasks) {
    monthCurrent.textContent = `${months[month]} ${year}`;
    calendarList.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Filtrar tareas por mes y año
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
export function initializeCalendar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.tasks) {
        console.error('Usuario no encontrado o sin tareas');
        return;
    }

    // Renderizar el calendario inicial
    renderCalendar(currentMonth, currentYear, currentUser.tasks);

    // Añadir event listeners para navegación
    monthBf.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear, currentUser.tasks);
    });

    monthAf.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear, currentUser.tasks);
    });
}