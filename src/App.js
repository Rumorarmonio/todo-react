import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import ItemForm from './components/Todos/ItemForm'
import ItemList from './components/Todos/ItemList'
import ItemsActions from './components/Todos/ItemsActions'
import './App.scss'

function App() {
    const [todos, setTodos] = useState([])

    const addTodoHandler = (text) => {
        const newTodo = {
            text,
            isCompleted: false,
            id: uuidv4()
        }
        setTodos([...todos, newTodo])
    }

    const deleteTodoHandler = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const toggleTodoHandler = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id
                ? {...todo, isCompleted: !todo.isCompleted}
                : {...todo}
        ))
    }

    const resetTodosHandler = () => {
        setTodos([])
    }

    const deleteCompletedTodosHandler = () => {
        setTodos(todos.filter((todo) => !todo.isCompleted))
    }

    const completedTodosCount = todos.filter((todo) => todo.isCompleted).length

    return (
        <div className="App">
            <h1>Todo App</h1>
            <ItemForm addTodo={addTodoHandler}/>
            {!!todos.length && (
                <ItemsActions
                    completedTodosExist={!!completedTodosCount}
                    resetTodos={resetTodosHandler}
                    deleteCompletedTodos={deleteCompletedTodosHandler}
                />)}
            <ItemList
                todos={todos}
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
