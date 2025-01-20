export class Todo {
    static id = 0;
    constructor(title) {
        if (!title){
            throw  new Error('title cant be empty')
        }
        this.title = title;
        this.completed = false;
        this.id = Todo.id++;
    }
    completeTodo (){
        this.completed = true;
    }
    unCompleteTodo (){
        this.completed = false;
    }
}

export class Todos {
    constructor() {
         this.todos = [];
    }
    getAllTodos(){
        return this.todos;
    }
    getCompletedTodos(){
        return this.todos.filter(todo=>todo.completed)
    }
    getUnCompleteTodos(){
        return this.todos.filter(todo=>!todo.completed)
    }
    addTodo (todo){
        if (this.todos.find(item=>item.title === todo.title || item.id === todo.id)){
            throw new Error('duplicated values')
        }
        this.todos.push(todo)
    }
    removeCompletedTodos(){
        this.todos = this.todos.filter(todo=>todo.completed)
    }
    getTodo(id){
        const todo = this.todos.find(todo=>todo.id===id);
        if (todo) return todo;
        throw new Error('todo not found')
    }
    deleteTodo (id){
        this.todos = this.todos.filter(todo=>todo.id!==id)
    }
}