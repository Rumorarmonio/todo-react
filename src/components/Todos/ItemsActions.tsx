import React from 'react'
import {RiDeleteBin2Line, RiRefreshLine} from 'react-icons/ri'
import Button from '../UI/Button'
import styles from './ItemsActions.module.scss'

function ItemsActions({resetTodos, deleteCompletedTodos, completedTodosExist}: any) {
    return (
        <div className={styles.todosActionsContainer}>
            <Button
                title="Reset Todos"
                onClick={resetTodos}
            >
                <RiRefreshLine/>
            </Button>
            <Button
                title="Clear Completed Todos"
                onClick={deleteCompletedTodos}
                disabled={!completedTodosExist}
            >
                <RiDeleteBin2Line/>
            </Button>
        </div>
    )
}

export default ItemsActions
