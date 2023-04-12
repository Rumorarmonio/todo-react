import React from 'react'
import Item from './Item'
import styles from './List.module.scss'
import {Task} from '../../models'

function List({tasks, editTask, deleteTask, toggleTask}: any) {
    return (
        <ul className={styles.container}>
            {!tasks.length && <h2>Nothing to show</h2>}
            {tasks.map((task: Task) => (
                <Item
                    key={task.id}
                    task={task}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                />
            ))}
        </ul>
    )
}

export default List
