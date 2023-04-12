import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import Form from './components/Todos/Form'
import List from './components/Todos/List'
import Actions from './components/Todos/Actions'
import {Task} from './models'
import './App.scss'
import Sorting from './components/Todos/Sorting'

const FILTER_MAP: any = {
    All: () => true,
    Active: (task: Task) => !task.isCompleted,
    Completed: (task: Task) => task.isCompleted
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [filter, setFilter] = useState<string>('All')

    const addTaskHandler = (text: string): void => {
        const newTask: Task = {
            text,
            isCompleted: false,
            id: uuidv4()
        }
        setTasks([...tasks, newTask])
    }

    const editTaskHandler = (id: string, newText: string): void => {
        setTasks(tasks.map((task: Task) =>
            task.id === id
                ? {...task, text: newText}
                : {...task}
        ))
    }

    const deleteTaskHandler = (id: string): void => {
        setTasks(tasks.filter((task: Task) => task.id !== id))
    }

    const toggleTaskHandler = (id: string): void => {
        setTasks(tasks.map((task: Task) =>
            task.id === id
                ? {...task, isCompleted: !task.isCompleted}
                : {...task}
        ))
    }

    const resetTasksHandler = (): void => {
        setTasks([])
    }

    const deleteCompletedTasksHandler = (): void => {
        setTasks(tasks.filter((task: Task) => !task.isCompleted))
    }

    const tasksCount: number = tasks.length

    const tasksByType: Task[] = tasks.filter(FILTER_MAP[filter])

    const filteredTasksCount: number = tasksByType.length

    const printResult = (count: number, type: string): string => {
        let word: string = count > 1 ? 'tasks' : 'task'
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
            <Form addTask={addTaskHandler}/>
            {!!tasks.length && (
                <Actions
                    completedTasksExist={!!filteredTasksCount}
                    resetTasks={resetTasksHandler}
                    deleteCompletedTasks={deleteCompletedTasksHandler}
                />)}
            <Sorting
                filterNames={FILTER_NAMES}
                setFilter={setFilter}
            />
            {tasksCount > 0 &&
                <h2>{printResult(filteredTasksCount, filter)}</h2>
            }
            <List
                tasks={tasksByType}
                editTask={editTaskHandler}
                deleteTask={deleteTaskHandler}
                toggleTask={toggleTaskHandler}
            />
        </div>
    )
}

export default App
