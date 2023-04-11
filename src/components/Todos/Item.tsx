import React, {useEffect, useRef, useState} from 'react'
import {RiDeleteBin2Line, RiTodoFill, RiEdit2Line} from 'react-icons/ri'
import {FaCheck} from 'react-icons/fa'
import styles from './Item.module.scss'
import Button from '../UI/Button'

function Item({task, editTask, deleteTask, toggleTask}: any) {
    const [isEditing, setEditing] = useState(false)
    const [newText, setNewText] = useState('')

    function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        editTask(task.id, newText)
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
                    htmlFor={task.id}
                >
                    New text for {task.text}
                </label>
                <input
                    id={task.id}
                    className={styles.todo__input}
                    type="text"
                    value={newText || task.text}
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
            task.isCompleted ? styles.completedTodo : ''
        }`}>
            <RiTodoFill className={styles.todoIcon}/>
            <p className={styles.todoText}>{task.text}</p>
            <RiEdit2Line
                className={styles.editIcon}
                onClick={() => setEditing(true)}
            />
            <RiDeleteBin2Line
                className={styles.deleteIcon}
                onClick={() => deleteTask(task.id)}
            />
            <FaCheck
                className={styles.checkIcon}
                onClick={() => toggleTask(task.id)}
            />
        </li>
    )

    return isEditing ? editingTemplate : viewTemplate
}

export default Item
