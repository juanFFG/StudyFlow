export class Task {
    constructor(type, subject, dueDate, value, comment) {
        this.type = type; // "examen", "entrega", "quiz", "exposición"
        this.subject = subject; // "matemáticas", "lengua", "historia", "física"
        this.dueDate = dueDate; // Debe incluir fecha y hora
        this.value = value; // Porcentaje de la nota (ej: 10)
        this.comment = comment.length > 20 ? comment.substring(0, 20) : comment; // Máximo 20 caracteres
    }
}

export default Task;