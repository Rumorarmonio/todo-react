import React from 'react'
import {useState} from 'react'
import styles from './ItemForm.module.scss'
import Button from '../UI/Button'

function ItemForm({addTodo}: any) {
    const [text, setText] = useState('')
    const onSubmitHandler = (event: any) => {
        event.preventDefault()
        addTodo(text)
        setText('')
    }

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit={onSubmitHandler}>
                <input
                    placeholder="Enter new todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit" title="Submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ItemForm
