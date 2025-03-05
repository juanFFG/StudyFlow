export class Task {
    constructor(title, type, dueDate, value, comment) {
        this.title = title;
        this.type = type; // "examen", "entrega", "quiz", "exposición"
        this.dueDate = dueDate; // Debe incluir fecha y hora
        this.value = value; // Porcentaje de la nota (ej: 10)
        this.comment = comment.length > 20 ? comment.substring(0, 20) : comment; // Máximo 20 caracteres
    }
}
