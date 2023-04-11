import React, {useEffect, useRef, useState} from 'react'
import {RiDeleteBin2Line, RiTodoFill, RiEdit2Line} from 'react-icons/ri'
import {FaCheck} from 'react-icons/fa'
import styles from './Card.module.scss'
import Button from '../UI/Button'

function usePrevious(value: any) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

function Card({todo, editTodo, deleteTodo, toggleTodo}: any) {
    const [isEditing, setEditing] = useState(false)
    const [newText, setNewText] = useState('')

    const wasEditing = usePrevious(isEditing)

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        editTodo(todo.id, newText)
        setEditing(false)
    }

    function handleChange(event: any) {
        setNewText(event.target.value)
    }

    const editingTemplate = (
        <li className={styles.todo}>
            <form
                className={styles.todo__form}
                onSubmit={handleSubmit}
            >
                <label
                    className="todo-label"
                    htmlFor={todo.id}
                >
                    New text for {todo.text}
                </label>
                <input
                    id={todo.id}
                    className={styles.todo__input}
                    type="text"
                    value={newText || todo.text}
                    onChange={handleChange}
                />
                <Button
                    type="button"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                </Button>
                <Button type="submit">
                    Save
                </Button>
            </form>
        </li>
    )

    const viewTemplate = (
        <li className={`${styles.todo} ${
            todo.isCompleted ? styles.completedTodo : ''
        }`}>
            <RiTodoFill className={styles.todoIcon}/>
            <p className={styles.todoText}>{todo.text}</p>
            <RiEdit2Line
                className={styles.editIcon}
                onClick={() => setEditing(true)}
            />
            <RiDeleteBin2Line
                className={styles.deleteIcon}
                onClick={() => deleteTodo(todo.id)}
            />
            <FaCheck
                className={styles.checkIcon}
                onClick={() => toggleTodo(todo.id)}
            />
        </li>
    )

    return isEditing ? editingTemplate : viewTemplate
}

export default Card
