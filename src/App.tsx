import React from 'react'
import {useLocalStorage} from './hooks/useLocalStorage'
import {v4 as uuidv4} from 'uuid'
import Form from './components/Todos/Form'
import List from './components/Todos/List'
import Actions from './components/Todos/Actions'
import Sorting from './components/Todos/Sorting'
import {Task} from './models'
import './App.scss'

const FILTERS: any = {
    All: () => true,
    Active: (task: Task) => !task.isCompleted,
    Completed: (task: Task) => task.isCompleted
}

const FILTER_NAMES = Object.keys(FILTERS)

function App() {
    const [filter, setFilter] = useLocalStorage('All', 'filter')
    const [tasks, setTasks] = useLocalStorage([], 'tasks')

    const addTask = (text: string): void => {
        const newTask: Task = {
            text,
            isCompleted: false,
            id: uuidv4()
        }
        setTasks([...tasks, newTask])
    }

    const editTask = (id: string, newText: string): void => {
        setTasks(tasks.map((task: Task) =>
            task.id === id
                ? {...task, text: newText}
                : {...task}
        ))
    }

    const deleteTask = (id: string): void => {
        setTasks(tasks.filter((task: Task) => task.id !== id))
    }

    const toggleTask = (id: string): void => {
        setTasks(tasks.map((task: Task) =>
            task.id === id
                ? {...task, isCompleted: !task.isCompleted}
                : {...task}
        ))
    }

    const deleteAllTasks = (): void => {
        setTasks([])
    }

    const deleteCompletedTasks = (): void => {
        setTasks(tasks.filter((task: Task) => !task.isCompleted))
    }

    const tasksByType: Task[] = tasks.filter(FILTERS[filter])

    const printResult = (count: number, type: string): string => {
        let word: string = count != 1 ? 'tasks' : 'task'
        switch (type) {
            case 'All':
                return `You have ${count} ${word} in your list`
            case 'Active':
                return `You have ${count} ${word} to complete`
            case 'Completed':
                return `You have completed ${count} ${word}`
            default:
                return 'What?'
        }
    }

    return (
        <div className="App">
            <h1>Todo List</h1>
            <h2>What needs to be done?</h2>
            <Form addTask={addTask}/>
            {!!tasks.length && (
                <Actions
                    completedTasksExist={!!tasks.filter(FILTERS['Completed']).length}
                    deleteAllTasks={deleteAllTasks}
                    deleteCompletedTasks={deleteCompletedTasks}
                />)}
            <Sorting
                filterNames={FILTER_NAMES}
                setFilter={setFilter}
            />
            {tasks.length > 0 &&
                <h2>{printResult(tasksByType.length, filter)}</h2>
            }
            <List
                tasks={tasksByType}
                editTask={editTask}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
            />
        </div>
    )
}

export default App
