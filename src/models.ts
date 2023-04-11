export class Todo {
    text: string
    isCompleted: boolean
    id: string

    constructor(text: string, isCompleted: boolean, id: string) {
        this.text = text;
        this.isCompleted = isCompleted;
        this.id = id;
    }
}
