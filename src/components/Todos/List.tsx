import React from 'react'
import Card from './Card'
import styles from './List.module.scss'
import {Todo} from "../../models";

function List({todos, editTodo, deleteTodo, toggleTodo}: any) {
    return (
        <ul className={styles.listContainer}>
            {!todos.length && <h2>Todo list is empty</h2>}
            {todos.map((todo: Todo) => (
                <Card
                    key={todo.id}
                    todo={todo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                />
            ))}
        </ul>
    )
}

export default List
