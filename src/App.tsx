import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import Form from './components/Todos/Form'
import List from './components/Todos/List'
import Actions from './components/Todos/Actions'
import {Todo} from './models'
import './App.scss'

const FILTER_MAP = {
    All: () => true,
    Active: (task: Todo) => !task.isCompleted,
    Completed: (task: Todo) => task.isCompleted
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodoHandler = (text: string): void => {
        const newTodo: Todo = {
            text,
            isCompleted: false,
            id: uuidv4()
        }
        setTodos([...todos, newTodo])
    }

    const editTodoHandler = (id: string, newText: string): void => {
        setTodos(todos.map((todo: Todo) =>
            todo.id === id
                ? {...todo, text: newText}
                : {...todo}
        ))
    }

    const deleteTodoHandler = (id: string): void => {
        setTodos(todos.filter((todo: Todo) => todo.id !== id))
    }

    const toggleTodoHandler = (id: string): void => {
        setTodos(todos.map((todo: Todo) =>
            todo.id === id
                ? {...todo, isCompleted: !todo.isCompleted}
                : {...todo}
        ))
    }

    const resetTodosHandler = (): void => {
        setTodos([])
    }

    const deleteCompletedTodosHandler = (): void => {
        setTodos(todos.filter((todo: Todo) => !todo.isCompleted))
    }

    const completedTodosCount: number = todos.filter((todo: Todo) => todo.isCompleted).length

    return (
        <div className="App">
            <h1>Todo App</h1>
            <Form addTodo={addTodoHandler}/>
            {!!todos.length && (
                <Actions
                    completedTodosExist={!!completedTodosCount}
                    resetTodos={resetTodosHandler}
                    deleteCompletedTodos={deleteCompletedTodosHandler}
                />)}
            <List
                todos={todos}
                editTodo={editTodoHandler}
                deleteTodo={deleteTodoHandler}
                toggleTodo={toggleTodoHandler}
            />
            {completedTodosCount > 0 &&
                <h2>{`You have completed ${completedTodosCount} 
                ${completedTodosCount > 1 ? 'todos' : 'todo'}!`}
                </h2>
            }
        </div>
    )
}

export default App
