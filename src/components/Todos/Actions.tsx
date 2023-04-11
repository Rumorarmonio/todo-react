import React from 'react'
import {RiDeleteBin2Line, RiRefreshLine} from 'react-icons/ri'
import Button from '../UI/Button'
import styles from './Actions.module.scss'

function Actions({resetTasks, deleteCompletedTasks, completedTasksExist, filterNames, setFilter}: any) {
    return (
        <div className={styles.container}>
            <Button
                title="Reset Todos"
                onClick={resetTasks}
            >
                <RiRefreshLine/>
            </Button>
            <Button
                title="Clear Completed Todos"
                onClick={deleteCompletedTasks}
                disabled={!completedTasksExist}
            >
                <RiDeleteBin2Line/>
            </Button>
        </div>
    )
}

export default Actions
