import React, {useState} from 'react'
import styles from './Form.module.scss'
import Button from '../UI/Button'

function Form({addTask}: any) {
    const [text, setText] = useState('')
    const onSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()
        addTask(text)
        setText('')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmitHandler}>
                <input
                    placeholder="Enter new task"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <Button type="submit" title="Submit task">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Form
